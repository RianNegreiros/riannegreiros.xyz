import { MotionDiv } from "@/components/MotionComponents";
import {
  TitleSkeleton,
  DateSkeleton,
  ImageSkeleton,
  TextSkeleton,
} from "@/components/ui/skeletons";

export default function PostSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <TitleSkeleton className="h-10 mb-4" />
        <DateSkeleton className="w-48 mb-8" />
        <ImageSkeleton className="h-64 mb-8" />

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TextSkeleton count={3} />
              </MotionDiv>
            ))}
          </div>

          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-4">
              <div className="rounded-lg border bg-card/50 backdrop-blur-sm p-6 shadow-sm">
                <TitleSkeleton className="h-5 w-32 mb-4" />
                <TextSkeleton count={5} />
              </div>
            </div>
          </aside>
        </div>
      </MotionDiv>
    </div>
  );
}
