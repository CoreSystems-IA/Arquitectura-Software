using July.Services.Shared.Enumeraciones;

namespace July.Services.Shared.Seguridad;

/// <summary>
/// Nombres de los 8 roles del panel tal como llegan en el claim <c>roles</c> del JWT interno. Salen de
/// <see cref="RolColaborador"/> para que el rol del token y el de la base de datos sean el mismo texto.
/// </summary>
public static class RolesPanel
{
    public const string Marketing = "MARKETING";
    public const string Administrador = "ADMINISTRADOR";
    public const string ProductosCredito = "PRODUCTOS_CREDITO";
    public const string ComiteCredito = "COMITE_CREDITO";
    public const string JefeComercial = "JEFE_COMERCIAL";
    public const string Agencia = "AGENCIA";
    public const string ProteccionDatos = "PROTECCION_DATOS";
    public const string Asesor = "ASESOR";

    public static IReadOnlyList<string> Todos { get; } =
    [Marketing, Administrador, ProductosCredito, ComiteCredito, JefeComercial, Agencia, ProteccionDatos, Asesor];

    public static string De(RolColaborador rol) => ValorCls.De(rol);
}
