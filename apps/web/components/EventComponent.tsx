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
    const [list, setList] = useState<Event[]>([]);
    const [searchInput, setSearchInput] = useState('');

    const filteredList = searchInput ?
    list.filter(l => 
        l.eventName.toLowerCase().includes(searchInput.toLowerCase())
    ) : list

    // Loading list from local storage
    useEffect(() => {
        const storedData = localStorage.getItem('events');
        if (storedData) {
            setList(JSON.parse(storedData));
        } 
    }, [])

    //  Adding events list to local storage 
    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(list));
    }, [list])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (eventName && date) {
            setList([ ...list, {id: Date.now() ,eventName, date}]);
            setEventName('');
            setDate('')
        } 
        console.log(list);
    }
    
    return <div className="flex">
    <form onSubmit={handleSubmit} className="flex flex-col">
        <input 
            type="text" 
            placeholder="Event Name" 
            required 
            className="text-red-700"
            value={eventName}
            onChange={e => setEventName((e.target.value).toString())}
        />
        <input 
            type="date" 
            required 
            value={date}
            onChange={e => setDate(e.target.value)}
        />
        <button 
            className="bg-red-700"
            type="submit"
            >Add Event</button>
    </form>
    <div>
        <input 
            type="text" 
            placeholder="search events"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
        />
    </div>
    <div>
        <div>
            <h2>Events</h2>
            {filteredList.map((e) => (
                <div key={e.id}>
                    {e.eventName} - {e.date}
                    <button 
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