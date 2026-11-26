using July.Services.Shared.Recursos;

// Entorno local de July. Uso: make run (o dotnet run --project src/Aspire/July.AppHost).
// La infraestructura usa las mismas imágenes que deployments/docker-compose y que Testcontainers.
var builder = DistributedApplication.CreateBuilder(args);

var claveOracle = builder.AddParameter("oracle-password", secret: true);
var claveEsquemas = builder.AddParameter("oracle-schema-password", secret: true);

// Oracle Database Free con un usuario por esquema (ms01…ms14 y quartz), creados por
// deployments/configs/oracle/init/01-usuarios.sh. Imagen gvenzl, la misma de Testcontainers.Oracle.
var oracle = builder
    .AddContainer(NombresRecursos.Oracle, "gvenzl/oracle-free", "23-slim-faststart")
    .WithEnvironment("ORACLE_PASSWORD", claveOracle)
    .WithEnvironment("JULY_SCHEMA_PASSWORD", claveEsquemas)
    .WithBindMount("../../../deployments/configs/oracle/init", "/container-entrypoint-initdb.d", isReadOnly: true)
    .WithVolume("july-oracle-datos", "/opt/oracle/oradata")
    .WithEndpoint(port: 1521, targetPort: 1521, name: "tcp")
    .WithLifetime(ContainerLifetime.Persistent);

// Mismo exchange de eventos y misma política de mensajes fallidos que en docker-compose.
var rabbitmq = builder
    .AddRabbitMQ(NombresRecursos.RabbitMq)
    .WithManagementPlugin()
    .WithDataVolume()
    .WithBindMount(
        "../../../deployments/configs/rabbitmq/rabbitmq.conf",
        "/etc/rabbitmq/conf.d/20-july.conf",
        isReadOnly: true
    )
    .WithBindMount(
        "../../../deployments/configs/rabbitmq/definitions.json",
        "/etc/rabbitmq/definitions.json",
        isReadOnly: true
    );

var redis = builder.AddRedis(NombresRecursos.Redis);

var vault = builder
    .AddContainer("vault", "hashicorp/vault", "1.20")
    .WithEnvironment("VAULT_DEV_ROOT_TOKEN_ID", "july-dev")
    .WithEnvironment("VAULT_DEV_LISTEN_ADDRESS", "0.0.0.0:8200")
    .WithHttpEndpoint(port: 8200, targetPort: 8200, name: "http")
    .WithArgs("server", "-dev");

// Los microservicios se registran aquí cuando empieza su etapa (SAD-07, sección 10; lección L-02):
//   builder.AddDotnetProject(NombresRecursos.Servicios.Ms01Canales, "../../Services/Ms01.Canales/July.Services.Canales.Api")
//       .WithReference(rabbitmq).WithReference(redis).WaitFor(oracle) …
_ = (oracle, rabbitmq, redis, vault);

builder.Build().Run();
