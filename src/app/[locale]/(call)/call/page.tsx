import dynamic from 'next/dynamic'
const DynamicStringeeComponent = dynamic(
    () => import('@/components/Core/common/CallScreen'),
    { ssr: false },
)
export default function CallPage() {
    return <DynamicStringeeComponent />
}
