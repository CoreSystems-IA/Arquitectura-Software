using System.Text.Json;
using July.BuildingBlocks.Core.Messaging;
using July.BuildingBlocks.Persistence.Oracle.Inbox;
using July.BuildingBlocks.Persistence.Oracle.Outbox;
using Microsoft.EntityFrameworkCore;

namespace July.BuildingBlocks.Persistence.Oracle;

/// <summary>
/// DbContext base de cada microservicio. Fija el esquema de Oracle del servicio (<c>ms01</c> a <c>ms14</c>,
/// regla L2 de SAD-06) y añade las tablas <c>outbox</c> e <c>inbox</c>.
/// </summary>
public abstract class JulyDbContext(DbContextOptions opciones, string esquema) : DbContext(opciones)
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    public string Esquema { get; } = esquema;

    public DbSet<OutboxMessage> Outbox => Set<OutboxMessage>();

    public DbSet<InboxMessage> Inbox => Set<InboxMessage>();

    /// <summary>
    /// Añade un evento al outbox. Se guarda con el próximo <c>SaveChangesAsync</c>, en la misma
    /// transacción que el cambio de estado.
    /// </summary>
    public void AgregarAlOutbox(IntegrationEvent evento)
    {
        ArgumentNullException.ThrowIfNull(evento);
        Outbox.Add(
            new OutboxMessage
            {
                Id = evento.Id,
                Tipo = evento.GetType().FullName!,
                ClaveEnrutamiento = evento.ClaveEnrutamiento,
                Contenido = JsonSerializer.Serialize(evento, evento.GetType(), Json),
                Traceparent = evento.Traceparent,
                OcurridoEn = evento.OcurridoEn,
            }
        );
    }

    /// <summary>Indica si el consumidor ya procesó el evento.</summary>
    public Task<bool> YaProcesadoAsync(Guid eventoId, string consumidor, CancellationToken cancelacion) =>
        Inbox.AnyAsync(m => m.EventoId == eventoId && m.Consumidor == consumidor, cancelacion);

    /// <summary>Marca el evento como procesado; se guarda junto con el efecto del consumidor.</summary>
    public void MarcarProcesado(Guid eventoId, string consumidor) =>
        Inbox.Add(
            new InboxMessage
            {
                EventoId = eventoId,
                Consumidor = consumidor,
                ProcesadoEn = DateTimeOffset.UtcNow,
            }
        );

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ArgumentNullException.ThrowIfNull(modelBuilder);
        modelBuilder.HasDefaultSchema(Esquema.ToUpperInvariant());

        modelBuilder.Entity<OutboxMessage>(e =>
        {
            e.ToTable("OUTBOX");
            e.HasKey(m => m.Id);
            e.Property(m => m.Tipo).HasMaxLength(300).IsRequired();
            e.Property(m => m.ClaveEnrutamiento).HasMaxLength(200).IsRequired();
            e.Property(m => m.Contenido).IsRequired();
            e.Property(m => m.Traceparent).HasMaxLength(55);
            e.Property(m => m.UltimoError).HasMaxLength(2000);
            e.HasIndex(m => new { m.PublicadoEn, m.OcurridoEn });
        });

        modelBuilder.Entity<InboxMessage>(e =>
        {
            e.ToTable("INBOX");
            e.HasKey(m => new { m.EventoId, m.Consumidor });
            e.Property(m => m.Consumidor).HasMaxLength(200);
        });

        base.OnModelCreating(modelBuilder);
    }
}
