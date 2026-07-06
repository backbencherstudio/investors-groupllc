import { baseApi } from "../api/baseApi";
import type {
    InvestorTransactionsQueryParams,
    InvestorTransactionsResponse,
    RentPaymentsQueryParams,
    RentPaymentsResponse,
    WithdrawalResponse,
    WithdrawalsQueryParams,
    GetOverAllIncomeResponse,
} from "./dashboardTypes";

const buildAnalyticsParams = (
    params: RentPaymentsQueryParams | InvestorTransactionsQueryParams | undefined,
    defaults: { page?: number | string; limit?: number | string } = {}
) => {
    const raw = {
        page: params?.page ?? defaults.page,
        limit: params?.limit ?? defaults.limit,
        search: params?.search,
        status: params?.status,
        dateFrom: params?.dateFrom,
        dateTo: params?.dateTo,
    };

    // Drop keys with no meaningful value
    return Object.fromEntries(
        Object.entries(raw).filter(
            ([, v]) => v !== undefined && v !== null && v !== ""
        )
    );
};


const buildWithdrawalsParams = (params?: WithdrawalsQueryParams) => {
    const merged = {
        ...buildAnalyticsParams(params, { page: 1, limit: 20 }),
        user_type: params?.user_type,
    };

    return Object.fromEntries(
        Object.entries(merged).filter(
            ([, v]) => v !== undefined && v !== null && v !== ""
        )
    );
};

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getOverAllIncome: builder.query<GetOverAllIncomeResponse, void>({
            query: () => ({
                url: "/dashboard/analytics/income-chart?period=this_year",
                method: "GET",
            }),
        }),

        getDashboardData: builder.query<unknown, void>({
            query: () => ({
                url: "/dashboard/data",
                method: "GET",
            }),
        }),

        getRentPayments: builder.query<
            RentPaymentsResponse,
            RentPaymentsQueryParams | void
        >({
            query: (params) => ({
                url: "/dashboard/analytics/tenant-rent-payments",
                method: "GET",
                params: buildAnalyticsParams(params ?? undefined, { page: 1, limit: 10 }),
            }),
        }),

        getInvestorTransactions: builder.query<
            InvestorTransactionsResponse,
            InvestorTransactionsQueryParams | void
        >({
            query: (params) => ({
                url: "/dashboard/analytics/investor-transactions",
                method: "GET",
                params: buildAnalyticsParams(params ?? undefined),
            }),
        }),

        getWithdrawals: builder.query<
            WithdrawalResponse,
            WithdrawalsQueryParams | void
        >({
            query: (params) => ({
                url: "/dashboard/analytics/withdrawals",
                method: "GET",
                params: buildWithdrawalsParams(params ?? undefined),
            }),
        }),
    }),
    overrideExisting: process.env.NODE_ENV === "development",
});

export const {
    useGetDashboardDataQuery,
    useGetRentPaymentsQuery,
    useGetInvestorTransactionsQuery,
    useGetWithdrawalsQuery,
    useGetOverAllIncomeQuery,
} = dashboardApi;
