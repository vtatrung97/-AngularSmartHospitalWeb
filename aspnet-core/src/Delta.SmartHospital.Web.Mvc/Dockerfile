#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["src/Delta.SmartHospital.Web.Mvc/Delta.SmartHospital.Web.Mvc.csproj", "src/Delta.SmartHospital.Web.Mvc/"]
COPY ["src/Delta.SmartHospital.Web.Core/Delta.SmartHospital.Web.Core.csproj", "src/Delta.SmartHospital.Web.Core/"]
COPY ["src/Delta.SmartHospital.Application/Delta.SmartHospital.Application.csproj", "src/Delta.SmartHospital.Application/"]
COPY ["src/Delta.SmartHospital.Application.Shared/Delta.SmartHospital.Application.Shared.csproj", "src/Delta.SmartHospital.Application.Shared/"]
COPY ["src/Delta.SmartHospital.Core.Shared/Delta.SmartHospital.Core.Shared.csproj", "src/Delta.SmartHospital.Core.Shared/"]
COPY ["src/Delta.SmartHospital.Core/Delta.SmartHospital.Core.csproj", "src/Delta.SmartHospital.Core/"]
COPY ["src/Delta.SmartHospital.EntityFrameworkCore/Delta.SmartHospital.EntityFrameworkCore.csproj", "src/Delta.SmartHospital.EntityFrameworkCore/"]
COPY ["src/Delta.SmartHospital.GraphQL/Delta.SmartHospital.GraphQL.csproj", "src/Delta.SmartHospital.GraphQL/"]
RUN dotnet restore "src/Delta.SmartHospital.Web.Mvc/Delta.SmartHospital.Web.Mvc.csproj"
COPY . .
WORKDIR "/src/src/Delta.SmartHospital.Web.Mvc"
RUN dotnet build "Delta.SmartHospital.Web.Mvc.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Delta.SmartHospital.Web.Mvc.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Delta.SmartHospital.Web.Mvc.dll"]
