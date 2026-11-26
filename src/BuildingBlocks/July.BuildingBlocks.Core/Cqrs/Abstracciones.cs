using July.BuildingBlocks.Core.Results;

namespace July.BuildingBlocks.Core.Cqrs;

/// <summary>Comando: cambia el estado de un servicio. Cada paso de CU-08 que escribe es un comando.</summary>
public interface ICommand<TRespuesta> { }

/// <summary>Consulta: solo lee. No publica eventos ni escribe en el outbox.</summary>
public interface IQuery<TRespuesta> { }

public interface ICommandHandler<in TComando, TRespuesta>
    where TComando : ICommand<TRespuesta>
{
    Task<Result<TRespuesta>> HandleAsync(TComando comando, CancellationToken cancelacion);
}

public interface IQueryHandler<in TConsulta, TRespuesta>
    where TConsulta : IQuery<TRespuesta>
{
    Task<Result<TRespuesta>> HandleAsync(TConsulta consulta, CancellationToken cancelacion);
}
