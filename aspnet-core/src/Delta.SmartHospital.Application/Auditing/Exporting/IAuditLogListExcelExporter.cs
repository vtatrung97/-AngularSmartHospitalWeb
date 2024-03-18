using System.Collections.Generic;
using Delta.SmartHospital.Auditing.Dto;
using Delta.SmartHospital.Dto;

namespace Delta.SmartHospital.Auditing.Exporting
{
    public interface IAuditLogListExcelExporter
    {
        FileDto ExportToFile(List<AuditLogListDto> auditLogListDtos);

        FileDto ExportToFile(List<EntityChangeListDto> entityChangeListDtos);
    }
}
