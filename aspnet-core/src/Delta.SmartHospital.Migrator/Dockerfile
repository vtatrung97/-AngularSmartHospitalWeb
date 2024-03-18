#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["src/Delta.SmartHospital.Migrator/Delta.SmartHospital.Migrator.csproj", "src/Delta.SmartHospital.Migrator/"]
COPY ["src/Delta.SmartHospital.EntityFrameworkCore/Delta.SmartHospital.EntityFrameworkCore.csproj", "src/Delta.SmartHospital.EntityFrameworkCore/"]
COPY ["src/Delta.SmartHospital.Core/Delta.SmartHospital.Core.csproj", "src/Delta.SmartHospital.Core/"]
COPY ["src/Delta.SmartHospital.Core.Shared/Delta.SmartHospital.Core.Shared.csproj", "src/Delta.SmartHospital.Core.Shared/"]
RUN dotnet restore "src/Delta.SmartHospital.Migrator/Delta.SmartHospital.Migrator.csproj"
COPY . .
WORKDIR "/src/src/Delta.SmartHospital.Migrator"
RUN dotnet build "Delta.SmartHospital.Migrator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Delta.SmartHospital.Migrator.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Delta.SmartHospital.Migrator.dll"]
