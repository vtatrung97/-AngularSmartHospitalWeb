using System.Collections.Generic;
using Abp;
using Delta.SmartHospital.Chat.Dto;
using Delta.SmartHospital.Dto;

namespace Delta.SmartHospital.Chat.Exporting
{
    public interface IChatMessageListExcelExporter
    {
        FileDto ExportToFile(UserIdentifier user, List<ChatMessageExportDto> messages);
    }
}
