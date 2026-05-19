
import { Button, Card, CloseButton } from "@heroui/react";

const AllTutorsPage = async () => {
  const res = await fetch("http://localhost:5000/tutors");
  const tutorsData = await res.json();
  console.log(tutorsData)
  return (
    <div>
      <div className="max-w-9/10 mx-auto mb-10">
        <h2 className="text-center text-4xl font-bold text-green-400 my-5">All Tutors</h2>
        <div className="grid grid-cols-3 gap-5" >
          {tutorsData.map((tutors) => {
            return <div className="">
              <Card className="w-full items-stretch md:flex-row border-2 border-green-500">
                <div className="relative h-[160px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[160px] sm:w-1/2">
                  <img
                    alt="Cherries"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
                    loading="lazy"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <Card.Header className="gap-1">
                    <Card.Title className="pr-8 text-2xl">{tutors.tutorName}</Card.Title>
                    <Card.Description className="text-xl">
                     {tutors.subject}
                    </Card.Description>
                    <CloseButton aria-label="Close banner" className="absolute top-3 right-3" />
                  </Card.Header>
                  <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{tutors.teachingMode}</span>
                      <span className="text-sm font-medium text-foreground">{tutors.sessionStartDate}</span>
                      
                    </div>
                    <Button className="w-full sm:w-auto">Details</Button>
                  </Card.Footer>
                </div>
              </Card>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default AllTutorsPage
