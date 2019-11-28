const TimeLogStore = () => {

    const getTimeLog = () => {
        const timeRowsStore = localStorage.getItem('timeRows');

        if (timeRowsStore !== null) {
            return JSON.parse(timeRowsStore);
        }

        return [];
    };

    return getTimeLog();
};

export default TimeLogStore;