import { Tabs } from '@/components/ui/tabs';
import { IHeroBgTab } from '@/type/site.config.interface';
import { TabsContent, TabsList } from '@radix-ui/react-tabs';
import SearchBoxTrigger from './search-box-trigger';

interface IProps {
  defaultValue?: IHeroBgTab;
}

const SearchBox = ({ defaultValue = 'FLIGHT' }: IProps) => {
  return (
    <div className='w-full mx-auto  md:py-8 relative'>
      <div></div>
    </div>
  );
};

export default SearchBox;
