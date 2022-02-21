import { useEffect, useState } from 'react';
import Icon from '@components/study/icon';
import ListItem from '@components/study/listItem';
import Memo from '@components/study/memo';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import {
  createNotion,
  fetchNotionPage,
  getThemePage,
  getThemePageNameGroup,
  ThemePage,
} from '@libs/client/notion';
import { UpdateBlockResponse } from '@notionhq/client/build/src/api-endpoints';
import useSWR from 'swr';
import client from '@libs/server/client';

type ThemeContent = {
  id: string;
  theme: string;
  title: string;
  toggle: boolean;
  createdAt: Date;
};

interface post {
  id: number;
  text: string;
  title: string;
  theme: string;
  content: string;
  toggle: boolean;
  comments: comment[];
  commentCount: number;
  likeCount: number;
  createdAt: Date;
}

interface comment {
  id: number;
  user: string;
  userId: number;
  postId: number;
  content: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const notion = createNotion();
  const pageId = process.env.NOTION_PAGE_ID!;
  const mainPage = await fetchNotionPage(notion, pageId);
  const themeNameGroup = getThemePageNameGroup(mainPage);
  const themePageGroup = await getThemePage(notion, themeNameGroup);

  const themeContent: ThemeContent[] = [];
  themePageGroup.map(({ themePageBlocks, themeName }: ThemePage) => {
    themePageBlocks.results.map((study: UpdateBlockResponse | any) => {
      if (study.type === 'child_page') {
        return themeContent.push({
          id: study.id,
          theme: themeName,
          title: study.child_page.title,
          toggle: false,
          createdAt: study.created_time,
        });
      }
    });
  });

  const postSortedByDate = themeContent.sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );

  postSortedByDate.map(
    async (post) =>
      await client.post.upsert({
        where: { id: post.id },
        update: {},
        create: post,
      })
  );

  return {
    props: { postSortedByDate },
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Study: NextPage = ({
  postSortedByDate,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [postData, setPostData] = useState<post[]>(postSortedByDate);
  const [filteredIcon, setfilteredIcon] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<post[]>([]);

  // const { data, error } = useSWR('/', fetcher);
  // console.log(themeContent)

  const getThemeFilterTextGroup = (themeContent: post[]) => {
    const themeTextGroup: string[] = [];
    themeContent.map((data: post) => {
      if (!themeTextGroup.includes(data.theme)) {
        themeTextGroup.push(data.theme);
      }
    });

    return themeTextGroup;
  };
  const themeTextGroup = getThemeFilterTextGroup(postSortedByDate);

  const onToggle = (item: string) => () => {
    filteredIcon.includes(item)
      ? setfilteredIcon(filteredIcon.filter((icon) => icon !== item))
      : setfilteredIcon(filteredIcon.concat(item));

    setPostData(
      postData.map((post) =>
        post.theme === item
          ? {
              ...post,
              toggle: !post.toggle,
            }
          : post
      )
    );
  };

  useEffect(() => {
    setFilteredList(postData.filter((post) => post.toggle === true));
  }, [postData]);

  return (
    <>
      <div className="flex flex-col px-2 py-2 space-y-8 bg-slate-300 rounded-md shadow-md">
        <div className="flex justify-between px-4 space-x-2">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 items-center gap-2 bg-slate-500 px-2 py-2 rounded-md shadow-md">
            {filteredIcon.length === 0 ? (
              <span className="text-xl font-bold text-center text-gray-400">
                Study Theme
              </span>
            ) : (
              filteredIcon.map((theme, i) => (
                <Icon key={i} text={theme} onClick={onToggle(theme)} />
              ))
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {themeTextGroup.map((theme, i) => (
              <Icon key={i} text={theme} fullName onClick={onToggle(theme)} />
            ))}
          </div>
        </div>
        <div className="bg-slate-500 py-2 px-2 min-h-[12rem] rounded-md shadow-md">
          <div className="space-y-3">
            {filteredList.map((filteredItem: post) => (
              <ListItem
                id={filteredItem.id}
                key={filteredItem.id}
                text={filteredItem.theme}
                title={filteredItem.title}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-5 bg-slate-500 rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {postSortedByDate?.map((post: post, i: number) => (
            <Memo
              key={post.id}
              id={post.id}
              text={post.theme}
              title={post.theme}
              content={post.title}
              commentCount={1}
              likeCount={1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Study;
