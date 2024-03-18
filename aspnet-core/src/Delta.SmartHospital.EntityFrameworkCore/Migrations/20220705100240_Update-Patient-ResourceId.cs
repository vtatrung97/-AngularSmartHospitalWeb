using Microsoft.EntityFrameworkCore.Migrations;

namespace Delta.SmartHospital.Migrations
{
    public partial class UpdatePatientResourceId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PatientID",
                table: "Patients",
                newName: "ResourceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ResourceId",
                table: "Patients",
                newName: "PatientID");
        }
    }
}
