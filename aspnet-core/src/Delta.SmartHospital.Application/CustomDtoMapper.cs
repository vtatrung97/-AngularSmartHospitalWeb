using Abp.Application.Editions;
using Abp.Application.Features;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.DynamicEntityProperties;
using Abp.EntityHistory;
using Abp.Localization;
using Abp.Notifications;
using Abp.Organizations;
using Abp.UI.Inputs;
using Abp.Webhooks;
using AutoMapper;
using IdentityServer4.Extensions;
using Delta.SmartHospital.Auditing.Dto;
using Delta.SmartHospital.Authorization.Accounts.Dto;
using Delta.SmartHospital.Authorization.Delegation;
using Delta.SmartHospital.Authorization.Permissions.Dto;
using Delta.SmartHospital.Authorization.Roles;
using Delta.SmartHospital.Authorization.Roles.Dto;
using Delta.SmartHospital.Authorization.Users;
using Delta.SmartHospital.Authorization.Users.Delegation.Dto;
using Delta.SmartHospital.Authorization.Users.Dto;
using Delta.SmartHospital.Authorization.Users.Importing.Dto;
using Delta.SmartHospital.Authorization.Users.Profile.Dto;
using Delta.SmartHospital.Chat;
using Delta.SmartHospital.Chat.Dto;
using Delta.SmartHospital.DynamicEntityProperties.Dto;
using Delta.SmartHospital.Editions;
using Delta.SmartHospital.Editions.Dto;
using Delta.SmartHospital.Friendships;
using Delta.SmartHospital.Friendships.Cache;
using Delta.SmartHospital.Friendships.Dto;
using Delta.SmartHospital.Localization.Dto;
using Delta.SmartHospital.MultiTenancy;
using Delta.SmartHospital.MultiTenancy.Dto;
using Delta.SmartHospital.MultiTenancy.HostDashboard.Dto;
using Delta.SmartHospital.MultiTenancy.Payments;
using Delta.SmartHospital.MultiTenancy.Payments.Dto;
using Delta.SmartHospital.Notifications.Dto;
using Delta.SmartHospital.Organizations.Dto;
using Delta.SmartHospital.Sessions.Dto;
using Delta.SmartHospital.WebHooks.Dto;
using Delta.SmartHospital.Patients.Dto;
using Delta.SmartHospital.Patients;
using Delta.SmartHospital.CodeSystems;
using Delta.SmartHospital.CodeSystems.Dto;
using Delta.SmartHospital.ValueSets;
using Delta.SmartHospital.ValueSets.Dto;
using Delta.SmartHospital.StructureDefinitions;
using Delta.SmartHospital.StructureDefinitions.Dto;
using Delta.SmartHospital.Locations;
using Delta.SmartHospital.Locations.Dto;
using Delta.SmartHospital.ServiceRequests;
using Delta.SmartHospital.ServiceRequests.Dto;
using Delta.SmartHospital.DataTypes;
using Delta.SmartHospital.DataTypes.Dto;

namespace Delta.SmartHospital
{
    internal static class CustomDtoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //Inputs
            configuration.CreateMap<CheckboxInputType, FeatureInputTypeDto>();
            configuration.CreateMap<SingleLineStringInputType, FeatureInputTypeDto>();
            configuration.CreateMap<ComboboxInputType, FeatureInputTypeDto>();
            configuration.CreateMap<IInputType, FeatureInputTypeDto>()
                .Include<CheckboxInputType, FeatureInputTypeDto>()
                .Include<SingleLineStringInputType, FeatureInputTypeDto>()
                .Include<ComboboxInputType, FeatureInputTypeDto>();
            configuration.CreateMap<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
            configuration.CreateMap<ILocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>()
                .Include<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
            configuration.CreateMap<LocalizableComboboxItem, LocalizableComboboxItemDto>();
            configuration.CreateMap<ILocalizableComboboxItem, LocalizableComboboxItemDto>()
                .Include<LocalizableComboboxItem, LocalizableComboboxItemDto>();

            //Chat
            configuration.CreateMap<ChatMessage, ChatMessageDto>();
            configuration.CreateMap<ChatMessage, ChatMessageExportDto>();

            //Feature
            configuration.CreateMap<FlatFeatureSelectDto, Feature>().ReverseMap();
            configuration.CreateMap<Feature, FlatFeatureDto>();

            //Role
            configuration.CreateMap<RoleEditDto, Role>().ReverseMap();
            configuration.CreateMap<Role, RoleListDto>();
            configuration.CreateMap<UserRole, UserListRoleDto>();

            

            //Edition
            configuration.CreateMap<EditionEditDto, SubscribableEdition>().ReverseMap();
            configuration.CreateMap<EditionCreateDto, SubscribableEdition>();
            configuration.CreateMap<EditionSelectDto, SubscribableEdition>().ReverseMap();
            configuration.CreateMap<SubscribableEdition, EditionInfoDto>();

            configuration.CreateMap<Edition, EditionInfoDto>().Include<SubscribableEdition, EditionInfoDto>();

            configuration.CreateMap<SubscribableEdition, EditionListDto>();
            configuration.CreateMap<Edition, EditionEditDto>();
            configuration.CreateMap<Edition, SubscribableEdition>();
            configuration.CreateMap<Edition, EditionSelectDto>();


            //Payment
            configuration.CreateMap<SubscriptionPaymentDto, SubscriptionPayment>().ReverseMap();
            configuration.CreateMap<SubscriptionPaymentListDto, SubscriptionPayment>().ReverseMap();
            configuration.CreateMap<SubscriptionPayment, SubscriptionPaymentInfoDto>();

            //Permission
            configuration.CreateMap<Permission, FlatPermissionDto>();
            configuration.CreateMap<Permission, FlatPermissionWithLevelDto>();

            //Language
            configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>();
            configuration.CreateMap<ApplicationLanguage, ApplicationLanguageListDto>();
            configuration.CreateMap<NotificationDefinition, NotificationSubscriptionWithDisplayNameDto>();
            configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>()
                .ForMember(ldto => ldto.IsEnabled, options => options.MapFrom(l => !l.IsDisabled));

            //Tenant
            configuration.CreateMap<Tenant, RecentTenant>();
            configuration.CreateMap<Tenant, TenantLoginInfoDto>();
            configuration.CreateMap<Tenant, TenantListDto>();
            configuration.CreateMap<TenantEditDto, Tenant>().ReverseMap();
            configuration.CreateMap<CurrentTenantInfoDto, Tenant>().ReverseMap();

            //User
            configuration.CreateMap<User, UserEditDto>()
                .ForMember(dto => dto.Password, options => options.Ignore())
                .ReverseMap()
                .ForMember(user => user.Password, options => options.Ignore());
            configuration.CreateMap<User, UserLoginInfoDto>();
            configuration.CreateMap<User, UserListDto>();
            configuration.CreateMap<User, ChatUserDto>();
            configuration.CreateMap<User, OrganizationUnitUserListDto>();
            configuration.CreateMap<Role, OrganizationUnitRoleListDto>();
            configuration.CreateMap<CurrentUserProfileEditDto, User>().ReverseMap();
            configuration.CreateMap<UserLoginAttemptDto, UserLoginAttempt>().ReverseMap();
            configuration.CreateMap<ImportUserDto, User>();

            //AuditLog
            configuration.CreateMap<AuditLog, AuditLogListDto>();
            configuration.CreateMap<EntityChange, EntityChangeListDto>();
            configuration.CreateMap<EntityPropertyChange, EntityPropertyChangeDto>();

            //Friendship
            configuration.CreateMap<Friendship, FriendDto>();
            configuration.CreateMap<FriendCacheItem, FriendDto>();

            //OrganizationUnit
            configuration.CreateMap<OrganizationUnit, OrganizationUnitDto>();

            //Webhooks
            configuration.CreateMap<WebhookSubscription, GetAllSubscriptionsOutput>();
            configuration.CreateMap<WebhookSendAttempt, GetAllSendAttemptsOutput>()
                .ForMember(webhookSendAttemptListDto => webhookSendAttemptListDto.WebhookName,
                    options => options.MapFrom(l => l.WebhookEvent.WebhookName))
                .ForMember(webhookSendAttemptListDto => webhookSendAttemptListDto.Data,
                    options => options.MapFrom(l => l.WebhookEvent.Data));

            configuration.CreateMap<WebhookSendAttempt, GetAllSendAttemptsOfWebhookEventOutput>();

            configuration.CreateMap<DynamicProperty, DynamicPropertyDto>().ReverseMap();
            configuration.CreateMap<DynamicPropertyValue, DynamicPropertyValueDto>().ReverseMap();
            configuration.CreateMap<DynamicEntityProperty, DynamicEntityPropertyDto>()
                .ForMember(dto => dto.DynamicPropertyName,
                    options => options.MapFrom(entity => entity.DynamicProperty.DisplayName.IsNullOrEmpty() ? entity.DynamicProperty.PropertyName : entity.DynamicProperty.DisplayName));
            configuration.CreateMap<DynamicEntityPropertyDto, DynamicEntityProperty>();

            configuration.CreateMap<DynamicEntityPropertyValue, DynamicEntityPropertyValueDto>().ReverseMap();
            
            //User Delegations
            configuration.CreateMap<CreateUserDelegationDto, UserDelegation>();

            //Patient
            configuration.CreateMap<CreateUpdatePatientInputDto, Patient>();
            configuration.CreateMap<Patient, PatientListDto>();
            configuration.CreateMap<Patient, PatientDto>();


            configuration.CreateMap<CodeSystem, CodeSystemListDto>();
            configuration.CreateMap<CodeSystem, CodeSystemDto>().ReverseMap();


            configuration.CreateMap<Location, LocationDto>().ReverseMap();
            configuration.CreateMap<ValueSet, ValueSetDto>().ReverseMap();
            configuration.CreateMap<StructureDefinition, StructureDefinitionDto>().ReverseMap();
            configuration.CreateMap<ServiceRequest, ServiceRequestDto>().ReverseMap();
            configuration.CreateMap<Identifier, IdentifierDto>().ReverseMap();

            /* ADD YOUR OWN CUSTOM AUTOMAPPER MAPPINGS HERE */
        }
    }
}
