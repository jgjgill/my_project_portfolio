import Link from 'next/link';
import Icon from './icon';

interface ListItemProps {
  id: number;
  text: string;
  title: string;
}

const ListItem = ({ id, text, title }: ListItemProps) => {
  return (
    <Link href={`study/${id}`} passHref>
      <a className="flex space-x-2 items-center animate-list">
        <Icon text={text} />
        <div className=" bg-slate-500 w-full cursor-pointer text-center transition hover:translate-y-1 py-1 rounded-md shadow-md">
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        </div>
      </a>
    </Link>
  );
};

export default ListItem;
