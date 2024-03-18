using Microsoft.EntityFrameworkCore.Migrations;

namespace Delta.SmartHospital.Migrations
{
    public partial class UpdateServiceRequestText : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "ServiceRequests",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Text",
                table: "ServiceRequests");
        }
    }
}
