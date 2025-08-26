interface TitleLProps {
  title: string;
}

const TitleL = ({ title }: TitleLProps) => {
  return (
    <h1 className="text-3xl font-bold text-foreground mb-6">
      {title}
    </h1>
  );
};

export default TitleL;