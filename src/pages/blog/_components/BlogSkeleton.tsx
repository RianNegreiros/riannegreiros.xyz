import { MotionDiv } from "@/components/MotionComponents";
import {
  DateSkeleton,
  TitleSkeleton,
  TextSkeleton,
} from "@/components/ui/skeletons";

export default function BlogSkeleton() {
  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="pb-6"
          >
            <div className="space-y-2">
              <DateSkeleton />
              <TitleSkeleton />
              <TextSkeleton count={2} />
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
}
