interface IProps {
  title: string;
  children?: React.ReactNode;
}

export const PageHead = ({ title, children }: IProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-4xl bold'>{title}</h1>

      {children}
    </div>
  );
};
