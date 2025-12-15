export enum UserRole {
    ADMIN= "admin",
    CUSTOMER= "customer",
    SELLER="seller"
}
export enum Gender{
    MALE= "male",
    FEMALE= "female",
    OTHER = "other"
}

export enum Status {
    ACTIVE= "active",
    INACTIVE="inactive",
}

export interface IPaginationParams{
    page?: number | null,
    limit?: number | null,
    search?: string | null,
    isPaid?: boolean,
    startDate?: string | Date | null; // Accept both string and Date
    endDate?: string | Date | null; 
}