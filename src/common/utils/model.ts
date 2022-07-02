import { RegistrationStatusEnum } from "../../enums/RegistrationStatusEnum";
import { RedistributionStatusEnum } from "../../enums/RedistributionStatusEnum";

export const AffiliateRole = [
    "Affiliate",
    "AffiliateManager",
    'IntegrationManager',
    'MasterAffiliate',
    'MasterAffiliateReferral',
]

export const AffiliateState = [
    'Active',
    'Banned',
    'Not Active',
]

export const OldCurrency = [
    'USD',
    'EUR',
    'GBP',
    'CHF',
    'BTC',
]

export const Currency = [
    'USD',
]

export const RegistrationStatus = [
    "Failed",
    "Registered",
    "Deposited",
    "Approved",
    "Declined",
]

export const RegistrationStatusObj = {
    [RegistrationStatusEnum.Failed] : "Failed",
    [RegistrationStatusEnum.Registered] : "Registered",
    [RegistrationStatusEnum.Deposited] : "Deposited",
    [RegistrationStatusEnum.Approved] : "Approved",
    [RegistrationStatusEnum.Declined] : "Declined",
}

export const RedistributionStatusObj = {
    [RedistributionStatusEnum.Disable] : "Disable",
    [RedistributionStatusEnum.Enable] : "Enable",
    [RedistributionStatusEnum.Finished] : "Finished",
    [RedistributionStatusEnum.Error] : "Error",
}

export const ReportType = [
    'Registrations',
    'Ftd',
    'All',
]

export const registrationModel = [
    "Created",
    "Registered",
    "Deposited",
    "Approved",
]

export const eventType = [
    "Registered",
    "Approved",
]

export const httpQueryType = [
    "GET",
    "POST",
]

export const plan = [
    "CPA",
    "CPL",
    "CPC",
]

export const brandStatus = [
    "Active",
    "Disabled",
]

export const brandPrivacy = [
    "Private",
    "Public",
]

export const responseStatus = [
    "Ok",
    "Failed",
]

export const OldPayoutType = [
    {label: "CPA", value: 0},
    {label: "CPL", value: 1},
    {label: "CPC", value: 2},
]

export const PayoutType = [
    {label: "CPA", value: 0},
    {label: "CPL", value: 1},
]

export const IntegrationType = [
    "API",
    "S2S",
]

export const DayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

export const DepositUpdateMode = [
    { value: 0, label: "Unknown" },
    { value: 2, label: "Automatically" },
    { value: 3, label: "Manually" },
]

export const RedistributionFrequency = [
    "Minute",
    "Hour",
    "Day",
]

export const RedistributionState = [
    "Disable",
    "Enable",
    "Finished",
    "Error",
]

export const DiffType = [
    "Positive",
    "Negative",
]