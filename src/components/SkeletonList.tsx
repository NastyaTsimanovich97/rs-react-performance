import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonList() {
  return <Skeleton count={8} height={40} />;
}
