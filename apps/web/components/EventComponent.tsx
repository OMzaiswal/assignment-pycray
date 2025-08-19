'use client'
import { useEffect, useState } from "react"

type Event = { 
    id: number,
    eventName: string; 
    date: string 
};

export const EventComponent = () => {

    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [list, setList] = useState<Event[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem('events');
        if (storedData) {
            setList(JSON.parse(storedData));
            setLoaded(true);
        }
    }, []);

    const filteredList = searchInput ?
    list.filter(l => 
        l.eventName.toLowerCase().includes(searchInput.toLowerCase())
    ) : list

    //  Adding events list to local storage 
    useEffect(() => {
        if (loaded)  {
            localStorage.setItem('events', JSON.stringify(list));
        }
    }, [list, loaded])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (eventName && date) {
            setList([ ...list, {id: Date.now() ,eventName, date}]);
            setEventName('');
            setDate('')
        }
    }
    
    return <div className="flex flex-col justify-center items-center mt-20 gap-8">
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-2 items-center">
        <div>
            <label htmlFor="eventName" className="text-gray-600 text-md mr-4">Event Name</label>
            <input 
                id="eventName"
                type="text" 
                placeholder="Type..." 
                required 
                className="text-gray-500 px-3 py-2 border-2 rounded-md"
                value={eventName}
                onChange={e => setEventName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="date" className="text-gray-600 text-md mr-4">Date</label>
            <input 
                id="date"
                type="date" 
                required 
                value={date}
                className="text-gray-500 px-3 py-2 border-2 rounded-md"
                onChange={e => setDate(e.target.value)}
            />
        </div>
        <button 
            className="bg-blue-400 text-white px-4 py-2 rounded-xl"
            type="submit"
            >Add Event</button>
    </form>

    <div className="flex flex-col w-full max-w-md items-center">
        {/* search box */}
        <input 
            type="text" 
            placeholder="search events"
            value={searchInput}
            className="text-gray-500 px-3 py-2 border-2 rounded-md"
            onChange={e => setSearchInput(e.target.value)}
        />

        <h2 className="text-xl font-semibold text-center mt-2">Events</h2>
    
        <div>
            {filteredList.map((e) => (
                <div key={e.id}>
                    {e.eventName} - {e.date}
                    <button 
                        className="text-red-600 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white ml-2"
                        onClick={() => 
                            setList(list.filter((l) => l.id !== e.id))
                        }
                    >   
                        Delete
                    </button>
                </div>
            )) }
        </div>
    </div>
</div>
}