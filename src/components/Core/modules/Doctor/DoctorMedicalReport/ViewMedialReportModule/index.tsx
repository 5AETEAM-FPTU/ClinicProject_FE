'use client'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import UnAccessable from '@/components/Core/common/UnAccesable';
import NotFound from '@/components/Core/common/NotFound';

export default function ViewMedicalReportModule() {
    const searchParam = useSearchParams();
    const reportId = searchParam.get('id');
  return (
    <div>
        {
            !reportId ? <NotFound/> : "Xin chao"
        }
    </div>
  )
}
