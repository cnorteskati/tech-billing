type PageTitleProps = {
  title: string;
  description: string;
};

// TODO make the text color be secondalry instead of hardcoded

function PageTitle({ title, description }: PageTitleProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500 mt-2">{description}</p>
    </header>
  );
}

export default PageTitle;
