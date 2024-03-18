using Microsoft.EntityFrameworkCore.Migrations;

namespace Delta.SmartHospital.Migrations
{
    public partial class UpdateServiceRequestPatient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Patient",
                table: "ServiceRequests",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Patient",
                table: "ServiceRequests");
        }
    }
}
