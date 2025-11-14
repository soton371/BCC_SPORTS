import HeaderTitle from '@/components/Header-title';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { IMyProfileRes } from '@/type/type';
import ProfileUpdateOrView from './_components/profile-update-or-view';

type Props = {};

const page = async (props: Props) => {
  const response = await fetchRequest<IMyProfileRes>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/b2c/profile`,
  );
  const data = response?.data;

  return (
    <>
      <HeaderTitle title='User Profile' description='View and manage your profile information' />
      <ProfileUpdateOrView data={data} />
    </>
  );
};

export default page;
