using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Delta.SmartHospital.Migrations
{
    public partial class CreateFhirResource : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminFhirResources",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResourceType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ResourceJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResourceXml = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCurrent = table.Column<bool>(type: "bit", nullable: false),
                    Reference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Version = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminFhirResources", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FhirResources",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResourceType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ResourceJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResourceXml = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCurrent = table.Column<bool>(type: "bit", nullable: false),
                    Reference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Version = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FhirResources", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AdminCmpDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false),
                    RelativeReference = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminCmpDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminCmpDatas_AdminFhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "AdminFhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdminDtDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Start = table.Column<DateTime>(type: "datetime2", nullable: false),
                    End = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminDtDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminDtDatas_AdminFhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "AdminFhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdminNumDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    Value = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminNumDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminNumDatas_AdminFhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "AdminFhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdminRefData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RelativeReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UrlHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminRefData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminRefData_AdminFhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "AdminFhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdminStrDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RelativeReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UrlHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminStrDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminStrDatas_AdminFhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "AdminFhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdminTknDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SystemHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminTknDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminTknDatas_AdminFhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "AdminFhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CmpDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false),
                    RelativeReference = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CmpDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CmpDatas_FhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "FhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DtDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Start = table.Column<DateTime>(type: "datetime2", nullable: false),
                    End = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DtDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DtDatas_FhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "FhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NumDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    Value = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NumDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NumDatas_FhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "FhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RelativeReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UrlHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefData_FhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "FhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StrDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false),
                    Hash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    LongString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShortString = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StrDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StrDatas_FhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "FhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TknDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SystemHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FhirResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TknDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TknDatas_FhirResources_FhirResourceId",
                        column: x => x.FhirResourceId,
                        principalTable: "FhirResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdminCmpDatas_FhirResourceId",
                table: "AdminCmpDatas",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_AdminDtDatas_FhirResourceId",
                table: "AdminDtDatas",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_AdminNumDatas_FhirResourceId",
                table: "AdminNumDatas",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_AdminRefData_FhirResourceId",
                table: "AdminRefData",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_AdminStrDatas_FhirResourceId",
                table: "AdminStrDatas",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_AdminTknDatas_FhirResourceId",
                table: "AdminTknDatas",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_CmpDatas_FhirResourceId",
                table: "CmpDatas",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_DtDatas_FhirResourceId",
                table: "DtDatas",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_NumDatas_FhirResourceId",
                table: "NumDatas",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_RefData_FhirResourceId",
                table: "RefData",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_StrDatas_FhirResourceId",
                table: "StrDatas",
                column: "FhirResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_TknDatas_FhirResourceId",
                table: "TknDatas",
                column: "FhirResourceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminCmpDatas");

            migrationBuilder.DropTable(
                name: "AdminDtDatas");

            migrationBuilder.DropTable(
                name: "AdminNumDatas");

            migrationBuilder.DropTable(
                name: "AdminRefData");

            migrationBuilder.DropTable(
                name: "AdminStrDatas");

            migrationBuilder.DropTable(
                name: "AdminTknDatas");

            migrationBuilder.DropTable(
                name: "CmpDatas");

            migrationBuilder.DropTable(
                name: "DtDatas");

            migrationBuilder.DropTable(
                name: "NumDatas");

            migrationBuilder.DropTable(
                name: "RefData");

            migrationBuilder.DropTable(
                name: "StrDatas");

            migrationBuilder.DropTable(
                name: "TknDatas");

            migrationBuilder.DropTable(
                name: "AdminFhirResources");

            migrationBuilder.DropTable(
                name: "FhirResources");
        }
    }
}
