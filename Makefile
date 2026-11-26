# Punto de entrada único de July (SAD-07, sección 4). `make` sin objetivo muestra la ayuda.
SHELL := /bin/bash
.DEFAULT_GOAL := help

SOLUCION    := July.slnx
COMPOSE_INF := deployments/docker-compose/docker-compose.infrastructure.yaml
ENV_INF     := deployments/docker-compose/.env
UIS         := src/UIs

.PHONY: help prepare restore build check format test trazabilidad run infra-up infra-down infra-wso2 helm-lint version

help: ## Muestra los objetivos disponibles
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

prepare: ## Restaura herramientas y paquetes, e instala los hooks de Git
	dotnet tool restore
	dotnet restore $(SOLUCION)
	dotnet husky install
	@if [ -f $(UIS)/package.json ]; then npm ci --prefix $(UIS); else echo "src/UIs aún no existe (etapa 1)"; fi
	@[ -f $(ENV_INF) ] || cp deployments/docker-compose/.env.sample $(ENV_INF)

restore: ## Restaura los paquetes de la solución
	dotnet restore $(SOLUCION)

build: ## Compila la solución
	dotnet build $(SOLUCION) --no-restore

check: ## Las mismas comprobaciones que el hook y Jenkins (formato, analizadores, dependencias)
	dotnet csharpier check .
	dotnet build $(SOLUCION) -p:TreatWarningsAsErrors=true
	dotnet test --solution $(SOLUCION) --no-build --filter-trait "Category=Dependencias"
	python3 Documentacion/Complementarios/revisiones/verificar-trazabilidad.py

format: ## Aplica el formato de csharpier
	dotnet csharpier format .

test: ## Pruebas unitarias, de integración y de contrato
	dotnet test --solution $(SOLUCION)

trazabilidad: ## Reglas V1–V8 de la cadena de trazabilidad de Documentacion/
	python3 Documentacion/Complementarios/revisiones/verificar-trazabilidad.py

run: ## Levanta el entorno local con Aspire (infraestructura y servicios)
	dotnet aspire run --project src/Aspire/July.AppHost

infra-up: ## Levanta Oracle Free, RabbitMQ, Redis y Vault con Docker Compose
	@[ -f $(ENV_INF) ] || cp deployments/docker-compose/.env.sample $(ENV_INF)
	docker compose -f $(COMPOSE_INF) --env-file $(ENV_INF) up -d --wait

infra-wso2: ## Añade el API Manager, el Identity Server y el Micro Integrator de WSO2
	docker compose -f $(COMPOSE_INF) --env-file $(ENV_INF) --profile wso2 up -d

infra-down: ## Detiene la infraestructura local (los volúmenes se conservan)
	docker compose -f $(COMPOSE_INF) --env-file $(ENV_INF) --profile wso2 down

helm-lint: ## Valida el chart de biblioteca y los charts de servicio
	helm lint deployments/helm/july-servicio
	@for c in deployments/helm/ms*/ deployments/helm/bff-*/; do [ -d "$$c" ] && helm lint "$$c" || true; done

version: ## Muestra la versión calculada por nbgv
	./scripts/calculate-version.sh
