
import Layout from "@/components/Layout";
import CalendarView from "@/components/CalendarView";
import { DoodleSquiggle } from "@/components/DoodleAccents";

const Calendar = () => {
    return (
        <Layout>
            <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-secondary/5">
                <div className="container-wide h-[85vh]">
                    <div className="relative h-full flex flex-col">
                        <DoodleSquiggle className="absolute -top-10 left-10 w-24 text-google-blue opacity-10" />

                        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
                            <CalendarView />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Calendar;
