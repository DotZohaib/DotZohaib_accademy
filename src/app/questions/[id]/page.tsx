import { array as database } from "../../../components/Database";
import QuestionClient from "./QuestionClient";

interface QuestionPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return database.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const unwrappedParams = await params;
  return <QuestionClient id={unwrappedParams.id} />;
}
