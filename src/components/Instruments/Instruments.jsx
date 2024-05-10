import DrumKit from "./DrumKit/DrumKit";
import Piano from "./Piano/Piano";

const Instruments = () => {
    return (
        <section className="w-screen h-screen instruments" style={{ background: '#111827', overflowY: 'scroll' }}>
            {/* Header */}
            <section className="border-b border-gray-700 pt-7 pb-5 px-10 flex justify-between">
                <h1 style={{ fontSize: '19px' }}>Virtual Instruments</h1>
                <div className="flex gap-10">
                    <button>Button</button>
                    <button>Button</button>
                </div>
            </section>

            {/* Instruments */}
            <section className="p-6">
                {/* Piano */}
                <Piano />
            </section>

            <section className="p-6">
                {/* Piano */}
                <DrumKit />
            </section>
        </section>
    )
}

export default Instruments;