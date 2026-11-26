using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace July.BuildingBlocks.Persistence.Oracle;

public static class DependencyInjection
{
    /// <summary>
    /// Registra el DbContext del servicio contra Oracle. La cadena de conexión se llama como el esquema
    /// (<c>ConnectionStrings:ms06</c>); en local la inyecta Aspire y en Kubernetes llega desde Vault.
    /// </summary>
    public static IServiceCollection AddJulyOracle<TContexto>(
        this IServiceCollection servicios,
        IConfiguration configuracion,
        string esquema
    )
        where TContexto : JulyDbContext
    {
        var cadena = configuracion.GetConnectionString(esquema)
            ?? throw new InvalidOperationException($"Falta la cadena de conexión 'ConnectionStrings:{esquema}'.");

        servicios.AddDbContext<TContexto>(opciones =>
            opciones.UseOracle(cadena, oracle =>
                oracle.MigrationsHistoryTable("__EFMigrationsHistory", esquema.ToUpperInvariant())
            )
        );
        return servicios;
    }
}
