import {useEffect, useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";




export const hubFetchGetMessage = (setter, setLoadingStatus, setErrorStatus) => {
    setLoadingStatus(true)



    // setLoadingStatus(false)
}



export const ChatList = () => {

    const [messageList, setMessageList] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const setterMessageList = (messageList) => {
        setMessageList(messageList)
    }

    useEffect(() => {
        hubFetchGetMessage(
            setterMessageList,
            setIsLoading,
            () => {}
        )
    }, [])


    return (
        <div>
            {
                (isLoading)
                    ? <h1>Loading</h1>
                    : (
                        messageList.map(i => (
                            <div>
                                <br/>
                                <hr/>
                                <br/>

                                <h4>Name: {i.name}</h4>
                                <p>{i.message}</p>

                                <br/>
                                <hr/>
                                <br/>
                            </div>
                        ))
                    )
            }
        </div>
    )
}



export const Form = ({sendMessage}) => {

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')


    const clearInputs = () => {
        setName('')
        setMessage('')
    }



    const onSend = () => {
        if (name.length < 1 || message.length < 1) {
            return
        }

        sendMessage(name, message)

        clearInputs()
    }


    return (
        <div>
            <div>
                <h3>Name: </h3>
                <input
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
            </div>

            <div>
                <h3>Message: </h3>
                <textarea
                    type="text"
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                />
            </div>

            <div>
                <button
                    onClick={onSend}
                >
                    Send
                </button>
            </div>
        </div>
    )
}



const HubConfig = {
    domain: 'https://localhost:5001',
    hubsEntrypoint: {
        chat: '/hub/check'
    }
}


export const useSignalR = (setterUpdatedDate) => {

    const [connection, setConnection] = useState(false)


    useEffect(() => {
        const url = `${HubConfig.domain}${HubConfig.hubsEntrypoint.chat}`

        console.log(url)

        const newConnection = new HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .build()

        console.log(newConnection)

        setConnection(newConnection)

    }, [])


    useEffect(() => {
        if (connection) {
            connection.start({ withCredentials: false })
                .then(() => {
                    console.log('SignalR Connection!')
                    connection.on('Receive', message => {
                        setterUpdatedDate(message)
                    })
                })
                .catch(e => {
                    console.log('SignalR error Connection')
                    console.error('Connection failed: ', e)
                })
        }
        else {
            console.log('No Connection')
        }

    }, [connection])

    return [connection]
}




export const Chat = () => {

    const setterUpdatedData = (data) => {
        console.log(data)
    }

    const [connection] = useSignalR(setterUpdatedData)

    const sendMessage = async ({user, message}) => {
        const chatMessage = {
            user,
            message
        }

        if (connection._connectionStarted) {
            try {
                await connection.send('SendMessage', chatMessage)
            }
            catch (e) {
                console.error('Error: ' + e)
            }
        }
    }


    return (
        <div>
            <h1>Chat</h1>
            <hr/>

            <button
                onClick={async () => {
                    const response = await fetch('https://localhost:5001/WeatherForecast', {
                        mode: 'no-cors'
                    })



                }}
            >
                CORS FUCK
            </button>

            <div>
                <Form
                    sendMessage={sendMessage}
                />
            </div>

            <div>
                <ChatList />
            </div>
        </div>
    )
}