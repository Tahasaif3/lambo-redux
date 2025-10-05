import { notFound } from "next/navigation"
import { carModels } from "@/lib/models-data"
import ConfigureClient from "@/components/ConfigureClient"

export function generateStaticParams() {
  return carModels.map((model) => ({
    id: model.id,
  }))
}

export default function ConfigurePage({ params }: { params: { id: string } }) {
  const model = carModels.find((m) => m.id === params.id)

  if (!model) {
    notFound()
  }

  return <ConfigureClient model={model} />
}