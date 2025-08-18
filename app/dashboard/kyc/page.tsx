"use client"
import KycUploadForm from '@/components/KycUploadForm';
import { UserData } from '@/types/type';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getUserData } from '@/lib/actions/GetUserData';


export default function KYCPage() {
    const { user, isLoaded } = useUser();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUserData() {
          if (!user?.id) return;
          
          try {
            const data = await getUserData(user.id);
            if (!data) {
              console.error('User not found');
              return;
            }

            console.log(loading)
            
            setUserData(data);
          } catch (error) {
            console.error('Error loading user data:', error);
          } finally {
            setLoading(false);
          }
        }
    
        if (isLoaded) {
          loadUserData();
        }
      }, [user, isLoaded]);
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* KYC Upload Section */}
          <KycUploadForm
            kycStatus={userData?.kyc} />
      </main>
    )
}