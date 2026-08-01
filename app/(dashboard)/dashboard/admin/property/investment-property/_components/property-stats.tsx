import { useGetApartmentsStatsQuery } from '@/redux/features/apartments/apartmentsApi';
    import React from 'react'
import { ApartmentStatsData } from '@/redux/features/apartments/apartmentsTypes';
import { Landlords } from '@/icons/Landlords';
import { Vendors } from '@/icons/Vendors';

export default function PropertyStats() {

    const { data: apartmentsStats } = useGetApartmentsStatsQuery();

    const { totalApartments, totalRentApartments, totalSoldApartments, totalInvestments } = apartmentsStats?.data as ApartmentStatsData || {};
    // console.log("apartmentsStats", apartmentsStats);

    return (
        <>
          <div className='mt-6'>
          
    
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                        title="Total Apartments"
                    value={totalApartments}
                    icon={<Landlords />}
              />
              <StatCard
                title="Total Rent Apartments"
                value={totalRentApartments}
                icon={<Vendors />}
              />
              <StatCard
                        title="Total Investments"
                    value={totalInvestments}
                    icon={<Landlords />}
              />
              <StatCard
                title="Total Sold Apartments"
                value={totalSoldApartments}
                icon={<Vendors />}
              />
    
              
              
            </div>
          </div>
        </>
      );
    }
    
    interface StatCardProps {
      title: string;
      value: number;
      icon: React.ReactNode;
    }
    
    const StatCard = ({ title, value, icon }: StatCardProps) => {
      return (
        <div className="flex items-center gap-4 bg-white rounded-[12px] shadow-sm p-6">
          <div>
            <div className="p-4 rounded-md bg-[#FCF1E6] text-orange-600">
              {icon}
            </div>
          </div>
    
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
            <p className="text-[#707070] font-medium text-lg">{title}</p>
          </div>
        </div>
      );
    };