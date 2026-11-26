namespace July.BuildingBlocks.Security.Jwt;

/// <summary>
/// Nombres de las políticas de autorización. Los roles concretos (los 8 de <c>RolColaborador</c> en
/// CLS-01) están en <c>July.Services.Shared</c>; aquí solo vive el nombre del claim que los lleva.
/// </summary>
public static class ClaimsJuly
{
    public const string Rol = "roles";

    public const string Agencia = "agencia";

    public const string Servicio = "azp";
}
