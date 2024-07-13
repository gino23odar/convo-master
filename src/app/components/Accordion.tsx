import React, { useState } from 'react'

interface DataItem {
    id: string;
    question: string;
    topic: string;
    answer: string;
  }
  
  type GroupedData = {
    [topic: string]: DataItem[];
  };

  
type AccordionProps = {
    data: any[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) =>{
    const [activeTopic, setActiveTopic] = useState<string | null>(null);

    const groupByTopic = (data: DataItem[]) => {
        return data.reduce<GroupedData>((acc, item) => {
            (acc[item.topic] = acc[item.topic] || []).push(item);
            return acc;
        }, {})
    }

    const groupedData = groupByTopic(data);
    //console.log(groupedData);

    const handleToggle = (topic: string) => {
        setActiveTopic(activeTopic === topic ? null : topic);
    }

    return(
        <div>
            { Object.entries(groupedData).map(([topic, items]) => (
                <div key={topic} className='mb-2 border rounded-md bg-gray-200 hover:bg-gray-300'>
                    <button onClick={() => handleToggle(topic)} className='w-full p-2'>
                        <p className='font-bold text-black sm:text-2xl'>
                            {topic}
                        </p>
                    </button>
                    {activeTopic === topic && (
                        <div>
                            {items.map((item: DataItem) => (
                                <div key={item.id} className='p-2'>
                                    <p className='font-bold'>{item.question}</p>
                                    <p>{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Accordion;