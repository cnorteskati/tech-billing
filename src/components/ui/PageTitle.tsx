type PageTitleProps = {
  title: string;
  description: string;
};

function PageTitle({ title, description }: PageTitleProps) {
  return (
    <header className="mb-8 text-center xl:text-left">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500 mt-2">{description}</p>
    </header>
  );
}

export default PageTitle;
