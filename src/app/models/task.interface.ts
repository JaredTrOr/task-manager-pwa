type ReminderType = {
    unitTime: 'minutes' | 'hours' | 'days',
    amount: number
}

export default interface TaskToDo {
    _id?: string,
    title: string,
    description: string,
    deadline: Date,
    listType?: string,
    reminder?: ReminderType,
    checked: boolean,
    creator?: string
}