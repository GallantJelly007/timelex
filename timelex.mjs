class Time{
    /** Количество миллисекунд прошедших с начала эпохи UNIX*/
    #timestamp = 0
    get timestamp(){ return this.#timestamp }
     /** Количество миллисекунд прошедших с начала 1 января 1 года н.э */
    #ticks=0
    get ticks(){ return this.#ticks }
    /** Миллисекунды от 0 до 999 */
    #millis=0
    get millis(){ return this.#millis }
    /** Секунды от 0 до 59 */
    #seconds=0
    get seconds(){ return this.#seconds }
    /** Минуты от 0 до 59 */
    #minutes=0
    get minutes(){ return this.#minutes }
    /** Часы от 0 до 23 */
    #hours=0
    get hours(){ return this.#hours }
    /** Кол-во секунд с остатком в десятичном формате*/
    #decimalSeconds=0
    get decimalSeconds(){ return this.#decimalSeconds }
    /** Кол-во минут с остатком в десятичном формате*/
    #decimalMinutes=0
    get decimalMinutes(){ return this.#decimalMinutes }
    /** Кол-во часов с остатком в десятичном формате*/
    #decimalHours=0
    get decimalHours(){ return this.#decimalHours }
    /** Календарный день */
    #day=1
    get day(){ return this.#day }
    /** День года */
    #dayOfYear=1
    get yDay(){ return this.#dayOfYear }
    /** День недели от 1 до 7, где 1-Понедельник */
    #dayOfWeek=4
    get wDay(){ return this.#dayOfWeek }
    /** Месяц  от 1 до 12, где 1-Январь*/
    #month=1
    get month(){ return this.#month }
    /** Год в формате XXXX */
    #year=1970
    get year(){ return this.#year }
    /** Свойство високосности, если true - год високосный */
    #isLeap=false
    get isLeap(){ return this.#isLeap }
    /** Текущее смещение времени по временной зоне */
    #tz=Time.TIMEZONE.zero
    get tz(){ return this.#tz.value }
    get fullTz(){ return this.#tz }

    
    static #MIN_TICKS_VALUE = 0
    static get MIN_TICKS_VALUE(){ return this.#MIN_TICKS_VALUE }
    static #MAX_TICKS_VALUE = 315537897599999
    static get MAX_TICKS_VALUE(){ return this.#MAX_TICKS_VALUE }
    static #MIN_TIMESTAMP_VALUE = -62135596800000
    static get MIN_TIMESTAMP_VALUE(){ return this.#MIN_TIMESTAMP_VALUE } 
    static #MAX_TIMESTAMP_VALUE = this.ticksToTimestamp(this.#MAX_TICKS_VALUE)
    static get MAX_TIMESTAMP_VALUE(){ return this.#MAX_TIMESTAMP_VALUE }

    static #ISORegex=[
        /^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])$/, //hhmm
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, //hh:mm
        /^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/, //hhmmss
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/, //hh:mm:ss
        /^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])([\+-]{1})(0[0-9]|1[0-9]|2[0-3])$/, //hhmmss±hh
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])([\+-]{1})(0[0-9]|1[0-9]|2[0-3])$/, //hh:mm:ss±hh
        /^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])([\+-]{1})(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])$/, //hhmmss±hhmm
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])([\+-]{1})(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, //hh:mm:ss±hh:mm
        /^([0-9]{4})-(0[1-9]|1[0-2])$/, //YYYY-MM
        /^([0-9]{4})(0[1-9]|1[0-2])$/, // YYYYMM
        /^([0-9]{4})-(0[1-9]|1[0-2])-(0[0-9]|[1-2][0-9]|3[0-1])$/, //YYYY-MM-DD
        /^([0-9]{4})(0[1-9]|1[0-2])(0[0-9]|[1-2][0-9]|3[0-1])$/, //YYYYMMDD
        /^([0-9]{4})(0[1-9]|1[0-2])(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/, //YYYYMMDDThhmmss
        /^([0-9]{4})-(0[1-9]|1[0-2])-(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/, //YYYY-MM-DDThh:mm:ss
        /^([0-9]{4})(0[1-9]|1[0-2])(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])([\+-]{1})(0[0-9]|1[0-9]|2[0-3])$/, //YYYYMMDDThhmmss±hh
        /^([0-9]{4})-(0[1-9]|1[0-2])-(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])([\+-]{1})(0[0-9]|1[0-9]|2[0-3])$/, //YYYY-MM-DDThh:mm:ss±hh
        /^([0-9]{4})(0[1-9]|1[0-2])(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])([\+-]{1})(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])$/, //YYYYMMDDThhmmss±hhmm
        /^([0-9]{4})-(0[1-9]|1[0-2])-(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])([\+-]{1})(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])$/, //YYYY-MM-DDThh:mm:ss±hh:mm
        /^([0-9]{4})-(0[1-9]|1[0-2])-(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\.)([0-9]{3})Z?$/, //YYYY-MM-DDThh:mm:ss[.SSS]
        /^([0-9]{4})-(0[1-9]|1[0-2])-(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\.)([0-9]{3})([\+-]{1})(0[0-9]|1[0-9]|2[0-3])Z?$/, //YYYY-MM-DDThh:mm:ss[.SSS]±hh
        /^([0-9]{4})-(0[1-9]|1[0-2])-(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\.)([0-9]{3})([\+-]{1})(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])Z?$/,  //YYYY-MM-DDThh:mm:ss[.SSS]±hhmm
        /^([0-9]{4})-(0[1-9]|1[0-2])-(0[0-9]|[1-2][0-9]|3[0-1])([T ]{1})(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\.)([0-9]{3})([\+-]{1})(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])Z?$/ //YYYY-MM-DDThh:mm:ss[.SSS]±hh:mm
    ]

    static #daysMonthYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    static #daysMonthLeapYear = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
    static #timeRegex={
        year:/^([1-9]|[1-9][0-9]{1,3})$/,
        month:/^([1-9]|1[0-2])$/,
        hours:/^([0-9]|1[0-9]|2[0-3])$/,
        minSec:  /^([0-9]|[0-5][0-9])$/,
        millis: /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/,
    }
    static #getMonthDayReg(month,leap=false){
        let day31 = /^([1-9]|1[0-9]|2[0-9]|3[0-1])$/
        let day30 = /^([1-9]|1[0-9]|2[0-9]|30)$/
        let day29 = /^([1-9]|1[0-9]|2[0-9])$/
        let day28 = /^([1-9]|1[0-9]|2[0-8])$/
        if([1,3,5,7,8,10,12].includes(month)){
            return day31
        }else if([4,6,9,11].includes(month)){
            return day30
        }else{
            if(leap) return day29
            else return day28
        }
    }

    static #convertInputToTimeProp(t,isTimestamp=false){
        let paramTicks=0;
        if (typeof t == 'object' && !(t instanceof Time) && !(t instanceof Date))
            paramTicks = Time.#calcTicks(t)
        else if (t instanceof Date)
            paramTicks = Time.timestampToTicks(t.getTime())
        else if (t instanceof Time)
            paramTicks = t.ticks
        else if (typeof t == 'number')
            paramTicks = Time.timestampToTicks(t)
        else if (typeof t == 'string'){
            paramTicks = new Date(t).getTime()
            paramTicks = isNaN(paramTicks) ? 0 : Time.timestampToTicks(paramTicks)
        }
        paramTicks = paramTicks < Time.#MIN_TICKS_VALUE ? Time.#MIN_TICKS_VALUE:
                    (paramTicks > Time.#MAX_TICKS_VALUE ? Time.#MAX_TICKS_VALUE : paramTicks)
        return isTimestamp ? Time.ticksToTimestamp(paramTicks) : paramTicks
    }

    /** Временные зоны */
    static TIMEZONE=this.#getTimezones()

    /** Стандартное значение временной зоны, UTC-0 по умолчанию*/
    static #defaultTz=Time.TIMEZONE.zero

    static get DEFAULT_TZ(){
        return Object.assign({},this.#defaultTz)
    }
    /**
     * ISO форматы, могут применяться для форматирования строки с помощью метода toISO()
     */
    static #ISOFormats={
        /**  Формат строки ISO (hhmm) */
        TIME:'@{Hm}',
        /**  Формат строки ISO (hh:mm) */
        TIMECLN:'@{H:m}',
        /**  Формат строки ISO (hhmmss) */
        TIMESEC:'@{HmS}',
        /**  Формат строки ISO (hh:mm:ss) */
        TIMESECCLN:'@{H:m:S}',
        /**  Формат строки ISO (hhmmss±hh) */
        TIMESECTH:'@{HmSTh}',
        /**  Формат строки ISO (hh:mm:ss±hh) */
        TIMESECCLNTH:'@{H:m:STh}',
        /**  Формат строки ISO (hhmmss±hhmm) */
        TIMESECTZ:'@{HmSThTp}',
        /**  Формат строки ISO (hh:mm:ss±hh:mm) */
        TIMESECCLNTZ:'@{H:m:SThTp}',
        /**  Формат строки ISO (YYYY-MM) */
        DATEYMCLN:'@{Y-M}',
        /**  Формат строки ISO (YYYYMM) */
        DATEYM:'@{YM}',
        /**  Формат строки ISO (YYYY-MM-DD) */
        DATEYMDCLN:'@{Y-M-D}',
        /**  Формат строки ISO (YYYYMMDD) */
        DATEYMD:'@{YMD}',
        /**  Формат строки ISO (YYYYMMDDThhmmss) */
        DATETIMEYMD:'@{YMDHmS}',
        /**  Формат строки ISO (YYYY-MM-DDThh:mm:ss) */
        DATETIMECLN:'@{Y-M-DTH:m:S}',
        /**  Формат строки ISO (YYYYMMDDThhmmss±hh) */
        DATETIMETH:'@{YMDTHmSTh}',
        /**  Формат строки ISO (YYYY-MM-DDThh:mm:ss±hh) */
        DATETIMECLNTH:'@{Y-M-DTH:m:STh}',
        /**  Формат строки ISO (YYYYMMDDThhmmss±hhmm) */
        DATETIMETZ:'@{YMDTHmSThTp}',
        /**  Формат строки ISO (YYYY-MM-DDThh:mm:ss±hh:mm) */
        DATETIMECLNTZCLN:'@{Y-M-DTH:m:STz}',
        /**  Формат строки ISO (YYYY-MM-DDThh:mm:ss[.SSS]) */
        DATETIMEMSCLN:'@{Y-M-DTH:m:S.s}',
        /**  Формат строки ISO (YYYY-MM-DDThh:mm:ss[.SSS]±hh) */
        DATETIMEMSCLNTH:'@{Y-M-DTH:m:S.sTh}',
         /**  Формат строки ISO (YYYY-MM-DDThh:mm:ss[.SSS]±hhmm) */
        DATETIMEMSCLNTZ:'@{Y-M-DTH:m:S.sThTp}',
         /**  Формат строки ISO (YYYY-MM-DDThh:mm:ss[.SSS]±hh:mm) */
        DATETIMEMSCLNTZCLN:'@{Y-M-DTH:m:S.sTz}'
    }

    static get ISO_FORMATS(){
        return Object.assign({},Time.#ISOFormats)
    }

    /**
     * Функция проверяющая является ли указанный год високосным
     * @param {number} year
     * Год начиная с 1
     * @returns {boolean} 
     * Возвращает true если год високосный, иначе - false
     */
    static isLeapYear(year) {
        if (year < 1) 
            throw new Error("Year out of range Exception")
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    /** 
     * Метод установки временной зоны по умолчанию
     * @param {object|string|number} timeZone
     * Временная зона из массива Time.TIMEZONE
     */
    static setDefaultTz(timeZone){
        let tz = Object.values(Time.TIMEZONE).find(tz=>tz.names.includes(timeZone) || tz.value == timeZone || tz == timeZone)
        if(tz) {
            Time.#defaultTz = tz
            return true
        }
        return false
    }

     /**
     * Статическая функция для получения кол-ва дней в месяце
     * @param {number} month 
     * Месяц от 1 до 12
     * @param {boolean} isLeap
     * Если true устанавливает год как високосный
     * ---
     * @returns {number} 
     * Кол-во дней в месяце
     */
    static getMonthDayCount(month,isLeap=false){
        let monthDays = [31,isLeap?29:28,31,30,31,30,31,31,30,31,30,31]
        if(month<1||month>12)
            throw Error('Month out of range exception')
        return monthDays[month-1]
    }

    /**
     * Функция для получения строкового представления всех месяцев, или указанного месяца
     * @param {number} [month]
     * Номер месяца от 1 до 12
     * @param {string} [locale] 
     * Параметр локализации
     * ---
     * @returns {string|Array<string>|undefined}
     * Возвращает строку (при month=[1,12]), массив строк, либо undefined если установленная локаль не поддерживается
     */
    static getMonthString(month=-1,locale='ru'){
        if(month!=-1 && month<1||month>12)
            throw new Error('Month out of range exception')
        if(Intl.DateTimeFormat.supportedLocalesOf(locale)){
            if(month==-1){
                let monthes = []
                for(let m=0; m<12; m++){
                   monthes.push((new Intl.DateTimeFormat(locale,{month:'long'}).format(new Date(1970,m,1))).replace(/^./, s => s.toUpperCase()))
                }
                return monthes
            }else{
                return (new Intl.DateTimeFormat(locale,{month:'long'}).format(new Date(1970,month-1,1))).replace(/^./, s => s.toUpperCase())
            }
        }
    }

    /**
     * Функция для получения строкового представления дней недели, или указанного дня
     * @param {number} day 
     * Номер дня недели от 1 до 7
     * @param {string} locale 
     * Параметр локализации
     * ---
     * @returns {string|Array<string>|undefined}
     * Возвращает строку (при day=[1,7]), массив строк, либо undefined если установленная локаль не поддерживается
     */
    static getWeekDaysString(day=-1,locale='ru'){
        if(day!=-1 && (day<1||day>7))
            throw new Error('Day out of range exception')
        if(Intl.DateTimeFormat.supportedLocalesOf(locale)){
            if(day==-1){
                let days = []
                for(let d=0; d<7 ; d++){
                    days.push((new Intl.DateTimeFormat(locale,{weekday:'long'}).format(new Date(1970,0,5+d))).replace(/^./, s => s.toUpperCase()))
                }
                return days
            }else{
                return (new Intl.DateTimeFormat(locale,{weekday:'long'}).format(new Date(1970,0,5+(day-1)))).replace(/^./, s => s.toUpperCase())
            }
        }
    }

    /**
     * Статическая функция получения кол-ва миллисекунд прошедших с 1 января 1 года н.э из метки времени UNIX
     * @param {number} timestamp 
     * Метка времени UNIX
     * @returns {number}
     * Кол-во миллисекунд
     */
    static timestampToTicks(timestamp){
        timestamp = timestamp < Time.#MIN_TIMESTAMP_VALUE ? Time.#MIN_TIMESTAMP_VALUE 
                        : (timestamp > Time.#MAX_TIMESTAMP_VALUE ? Time.#MAX_TIMESTAMP_VALUE : timestamp)
        return timestamp+62135596800000
    }

    /**
     * Статическая функция получения метки времени UNIX из кол-ва миллисекунд прошедших с 1 января 1 года н.э
     * @param {number} ticks 
     * Кол-во миллисекунд прошедших с 1 января 1 года
     * @returns {number}
     * Метка времени UNIX
     */
    static ticksToTimestamp(ticks){
        ticks = ticks < Time.#MIN_TICKS_VALUE ? Time.#MIN_TICKS_VALUE 
                    : (ticks > Time.#MAX_TICKS_VALUE ? Time.#MAX_TICKS_VALUE : ticks) 
        return ticks-62135596800000
    }

    /**
     * Статическая функция создания определенной даты
     * @param {number} year
     * Год от 1 до 9999 (по умолчанию - 1970)
     * @param {number} month
     * Месяц от 1 до 12 (по умолчанию - 1)
     * @param {number} day
     * День в пределах указанного месяца и года (по умолчанию - 1)
     * @param {number} hours
     * Час в 24-х часовом формате (по умолчанию - 0)
     * @param {number} minutes
     * Минуты от 0 до 59 (по умолчанию - 0)
     * @param {number} seconds
     * Секунды от 0 до 59 (по умолчанию - 0)
     * @param {number} ms 
     * Миллисекунды от 0 до 999 (по умолчанию - 0)
     * @param {object|string|number} tz
     * Временная зона соответствующая Time.TIMEZONE, числовому значению смещения, 
     * либо стандартным временным зонам JS в виде строки (по умолчанию UTC0)
     * @returns {Time}
     * Возвращает объект Time
     */ 
    static create(year=1970,month=1,day=1,hours=0,minutes=0,seconds=0,ms=0,tz=Time.#defaultTz){
        const ticks = Time.#calcTicks({
            year:year,
            month:month,
            day:day,
            hours:hours,
            minutes:minutes,
            seconds:seconds,
            millis:ms,
            timezone:tz
        })
        return new Time(Time.ticksToTimestamp(ticks))
    }

    /**
     * Функция которая создает случайную дату в заданном диапазоне дат
     * @param {number|Time|Date|string|object} min
     * Минимальное значение времени, метка времени UNIX, объект Time или объект с настройками
     * @param {number|Time|Date|string|object} max 
     * Максимальное значение времени, метка времени UNIX, объект Time или объект с настройками
     * @param {number|object|string} tz 
     */
    static random(min=Time.#MIN_TIMESTAMP_VALUE, max = Time.#MAX_TIMESTAMP_VALUE, tz = Time.#defaultTz){
        if(typeof min == 'number' && min < Time.#MIN_TIMESTAMP_VALUE)
            throw new Error('Min value out of allowed range!')
        if(typeof max == 'number' && max > Time.#MAX_TIMESTAMP_VALUE)
            throw new Error('Max value out of allowed range!')
        const getRandom = (min, max) => {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        }
        let range = [min,max];
        let rangeTstmp = [];
        for(const rangeValue of range){
            rangeTstmp.push(Time.#convertInputToTimeProp(rangeValue,true))
        }
        return new Time(getRandom(rangeTstmp[0],rangeTstmp[1]))
    }

    /**
     * Функция для нахождения кол-ва високосных дней(годов) в указанном промежутке лет
     * @param {number} yearStart 
     * Стартовый год начиная с 1
     * @param {number} yearEnd 
     * Финальный год начиная с 1
     * @returns {number}
     * Кол-во високосных лет(дней)
     */
    static leapYearsBetween(yearStart,yearEnd){
        if(yearStart<1||yearEnd<1)
            throw new Error('Param year out of range Exception');
        let diff = yearEnd-yearStart
        let leapYears = Math.floor(diff/4-diff/100+diff/400)
        return leapYears;
    }

    /** 
    * Создание нового объекта времени
    * @param {Time|Date|string|number|null} param
    * Строка времени, временная метка в миллисекундах, стандартный объект Date либо другой объект Time для установки первоначального значения
    * @param {object|string|number|null} timeZone 
    * Временная зона из массива Time.TIMEZONE
    */
    constructor(param=null,timeZone=null){
        this.#timestamp = Time.#convertInputToTimeProp(param,true)
        this.#tz=Time.#defaultTz
        if(timeZone!==null){
            let tz = Object.values(Time.TIMEZONE).find(tz=>tz.names.includes(timeZone) || tz.value == timeZone || tz == timeZone)
            if(tz) this.#tz = tz
        }
        this.#calcDate()
    }

    static #getTimezones(){
        const allTzString = Intl.supportedValuesOf('timeZone')
        const date = new Date()
        let tzNums = [], allTz = []
        let TIMEZONE = {}
        for (const tz of allTzString) {
            let timezoneVal = new Date(date.toLocaleString('en-US', { timeZone: tz })).getTime() - date.getTime()
            let tzNum = Number((((timezoneVal / 3600000) - (date.getTimezoneOffset() / 60))).toFixed(2))
            tzNum = tzNum == -0 ? 0 : tzNum
            tzNums.push(tzNum)
            allTz.push([tzNum, tz])
        }
        tzNums = tzNums.filter((value, index) => tzNums.indexOf(value) == index).sort((a, b) => a - b)
        for (const tzNum of tzNums) {
            const strTzNum = Math.abs(tzNum).toFixed(0) + (tzNum % 1 != 0 ? `_${(60 * (Math.abs(tzNum) % 1))}` : '')
            const propName = tzNum < 0 ? `minus_${strTzNum}` : (tzNum > 0 ? `plus_${strTzNum}` : 'zero')
            const stringTzs = allTz.filter(tz => tz[0] == tzNum).map(tz => tz[1])
            TIMEZONE[propName] = {
                names: stringTzs,
                value: tzNum
            }
        }
        return TIMEZONE
    }

    /**
     * @param {object|null} param 
     * @param {Time|null} obj 
     */
    static #calcTicks(param=null,obj=null){
        const paramYear = (param?.year && typeof param.year=='number' && Time.#timeRegex.year.test(param.year)) ? param.year : (obj instanceof Time ? obj.year : 1970)
        const isLeap = Time.isLeapYear(paramYear)
        const paramMonth = (param?.month && typeof param?.month=='number' && Time.#timeRegex.month.test(param.month)) ? param.month : (obj instanceof Time ? obj.month : 1)
        const objDay = (obj instanceof Time ? obj.day : 1)
        const paramDay = (param?.day && typeof param?.day=='number' && Time.#getMonthDayReg(paramMonth,isLeap).test(param.day)) ? param.day 
                       : (Time.#getMonthDayReg(objDay,isLeap) ? objDay : 1)
        const paramHours = (param?.hours && typeof param.hours=='number' && Time.#timeRegex.hours.test(param.hours)) ? param.hours : (obj instanceof Time ? obj.hours : 0)
        const paramMinutes = (param?.minutes && typeof param.minutes=='number' && Time.#timeRegex.minSec.test(param.minutes)) ? param.minutes : (obj instanceof Time ? obj.minutes : 0)
        const paramSeconds = (param?.seconds && typeof param?.seconds=='number' && Time.#timeRegex.minSec.test(param.seconds)) ? param.seconds : (obj instanceof Time ? obj.seconds : 0)
        const paramMs = (param?.millis && typeof param?.millis=='number' && Time.#timeRegex.millis.test(param.millis)) ? param.millis : (obj instanceof Time ? obj.millis : 0)
        let timeZone = param?.timezone ? Object.values(Time.TIMEZONE).find(tz=>tz.names.includes(param.timezone) || tz.value == param.timezone || tz == param.timezone) : (obj instanceof Time ? obj.#tz : Time.#defaultTz)
        timeZone = timeZone ?? (obj instanceof Time ? obj.#tz : Time.#defaultTz)
        let days = 1
        const arrDays = isLeap ? Time.#daysMonthLeapYear: Time.#daysMonthYear
        if (paramDay >= 1 && paramDay <= arrDays[paramMonth] - arrDays[paramMonth - 1]) {
            if(obj instanceof Time){
                obj.#day = paramDay
                obj.#dayOfYear = arrDays[paramMonth - 1] + paramDay
            } 
            const y = paramYear - 1
            days = y * 365 + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + arrDays[paramMonth - 1] + paramDay - 1
        }
        const timeTicks = paramHours * 3600000 + paramMinutes * 60000 + paramSeconds*1000+paramMs
        let allTicks = Math.trunc(days*24*3600*1000) + timeTicks + (timeZone.value*3600000*-1)
        if(allTicks>this.#MAX_TICKS_VALUE || allTicks <this.#MIN_TICKS_VALUE)
            throw new Error('Ticks out of allowed range!')
        if(obj instanceof Time){
            obj.#ticks = allTicks
            obj.#timestamp = Time.ticksToTimestamp(obj.ticks)
            obj.#dayOfWeek=Math.floor(Math.abs(((days%7)-6)<=0?((days%7)-6)+7:((days%7)-6)))
            obj.#decimalHours = timeTicks/3600000
            obj.#decimalMinutes = (paramMinutes * 60000 + paramSeconds*1000+paramMs)/60000
            obj.#decimalSeconds = (paramSeconds*1000+paramMs)/1000
            obj.#hours = Math.trunc(obj.decimalHours)
            obj.#minutes = Math.trunc(obj.decimalMinutes)
            obj.#seconds = Math.trunc(obj.decimalSeconds)
            obj.#millis = paramMs
            obj.#month = paramMonth
            obj.#year = paramYear
            obj.#isLeap = isLeap
            obj.#tz = timeZone
        }
        return allTicks
    }      

    /**
     * 
     * @param {string} str 
     * @param {Time|null} obj 
     */
    static #reverseISO(str, obj=null){
        let objDate={
            year:1970,
            month:1,
            day:1,
            hours:0,
            minutes:0,
            seconds:0,
            millis:0,
            tzHours:0,
            tzMinutes:0,
        }
        let tz=Time.TIMEZONE.zero
        let keys =['year','month','day','hours','minutes','seconds','millis','tzHours','tzMinutes']
        let isISO = false
        for(let reg of Time.#ISORegex){
            let res = str.match(reg)
            if(res){
                res.shift()
                let tzSum=0
                let cicle = res.length
                let elem=res.shift() ?? ''
                let isMs=false
                for(let i=0,k=0;i<cicle;i++){
                    if(i==0&&elem.length!=4){
                        k+=3
                    }
                    if(/^([T ]{1})$/.test(elem)){
                        elem=res.shift() ?? ''
                        continue;
                    }
                    if(/^(\.)$/.test(elem)){
                        isMs=true
                        elem=res.shift() ?? ''
                        continue;
                    }
                    if(/^([\+-]{1})$/.test(elem)){
                        k+=!isMs?1:0
                        tzSum=elem=='-'?-1:1
                        elem=res.shift() ?? ''
                        continue;
                    }
                    objDate[keys[k]]=Number(elem)
                    elem=res.shift() ?? ''
                    k++
                }
                tz = ((objDate.tzHours)+(objDate.tzMinutes/60))*tzSum
                isISO = true
                break
            }
        } 
        if(!isISO)
            throw new Error('Param str is not ISO format')
        return Time.#calcTicks({
            year:objDate.year,
            month:objDate.month,
            day:objDate.day,
            hours:objDate.hours,
            minutes:objDate.minutes,
            seconds:objDate.seconds,
            millis:objDate.millis,
            timezone:tz
        },obj)
    }

    static parseISO(str){
        return Time.#reverseISO(str)
    }

    #calcDate(){
        this.#ticks=Time.timestampToTicks(this.timestamp)
        let calcTicks = this.ticks+(this.tz*3600*1000)
        let days = calcTicks/86400000
        let leapForYear = Math.trunc((Math.trunc(days)+306)/1461)-Math.trunc((Math.trunc(days)+306)/36524)+Math.trunc((Math.trunc(days)+306)/146096)
        this.#year=Math.trunc((Math.trunc(days)-leapForYear)/365)+1
        this.#isLeap = Time.isLeapYear(this.year)
        let diy = Math.trunc(days)-((this.year-1) * 365 + Math.floor((this.year-1) / 4) - Math.floor((this.year-1) / 100) + Math.floor((this.year-1) / 400) - 1)
        let arrDays = this.isLeap?Time.#daysMonthLeapYear:Time.#daysMonthYear
        let month = arrDays.findIndex(mDays => diy <= mDays) 
        this.#month= month == -1 ? 1 : month
        this.#day=diy-arrDays[this.#month-1]
        this.#dayOfYear = arrDays[this.#month-1] + this.#day
        this.#decimalHours = (calcTicks%86400000)/3600000
        this.#decimalMinutes = (calcTicks%3600000)/60000
        this.#decimalSeconds = (calcTicks%60000)/1000
        this.#hours = Math.trunc(this.decimalHours)
        this.#minutes = Math.trunc(this.decimalMinutes)
        this.#seconds = Math.trunc(this.decimalSeconds)
        this.#millis= calcTicks%1000
        this.#dayOfWeek=Math.floor(Math.abs(((days%7)-6)<=0?((days%7)-6)+7:((days%7)-6)))
    }

    #getMonthDays(){
        return [31,this.isLeap?29:28,31,30,31,30,31,31,30,31,30,31]
    }

    #calcAddSub(timeObj,add=true){
        let paramTicks = Time.#convertInputToTimeProp(timeObj)
        let ticks = add ? this.ticks+paramTicks : this.ticks-paramTicks
        ticks = ticks < Time.#MIN_TICKS_VALUE ? Time.#MIN_TICKS_VALUE 
                    : ( ticks > Time.#MAX_TICKS_VALUE ? Time.#MAX_TICKS_VALUE : ticks)
        this.#timestamp = Time.ticksToTimestamp(ticks)
        this.#calcDate()
        return this
    }

    /** 
     * Установка новой временной зоны для текущего объекта Time
     * @param {object|number|string} timeZone
     * Временная зона из массива Time.TIMEZONE
    */
    setTz(timeZone){
        let tz = Object.values(Time.TIMEZONE).find(tz=>tz.names.includes(timeZone) || tz.value == timeZone || tz == timeZone)
        if(tz) {
            this.#tz = tz
            this.#calcDate()
        }
        return this
    }

    /**
     * Функция для получения кол-ва дней в месяце текущего объекта даты
     * @returns {number} 
     * Кол-во дней в месяце
     */
    getMonthDayCount(){
        return this.#getMonthDays()[this.month-1]
    }

    /**
     * Функция для обновления объекта до текущего времени
     */
    update() {
        this.#timestamp = Date.now()
        this.#calcDate()
        return this
    }

    /**
     * Функция для сложения дат
     * @param {Time|Date|object|string|number} timeObj
     * Объект Time,Date, строка времени, объект содержащий информацию о дате или кол-во миллисекунд для сложения с текущей датой 
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    add(timeObj){ 
        return this.#calcAddSub(timeObj)
    }

    /**
     * Функция для вычитания дат
     * @param {Time|Date|object|string|number} timeObj
     * Объект Time,Date, строка времени, объект содержащий информацию о дате или кол-во миллисекунд для вычитания из текущей даты
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    diff(timeObj){
        return this.#calcAddSub(timeObj,false)
    }

    /**
     * @typedef Splitter
     * @property {number} [days]
     * Кол-во дней
     * @property {number} [hours]
     * Кол-во часов
     * @property {number} [minutes]
     * Кол-во минут
     * @property {number} [seconds]
     * Кол-во секунд
     * @property {number} [ticks]
     * Кол-во тиков(миллисекунд)
     * @property {boolean} [lastReturn]
     * Параметр указывающий нужно ли возвращать последнюю временную метку если она будет за границами диапазона
     */

    /** 
     * Функция для разбиения текущего Time объекта на несколько временных меток
     * @param {Splitter|number} splitter
     * Кол-во отрезков на которые нужно разбить, либо объект настроек. При использовании объекта, 
     * все свойства не имеют ограничений по кол-ву и шаг разбиения расчитывается в результате сложения всех числовых свойств.
     * Например: используя 120 дней и 60 часов получим 122д. 12ч.
     * @param {Time|null} toDate
     * Второй объект Time для ограничения периода разбиения, (в этом случае начальной меткой времени считается наименьшая, чтобы сменить порядок используйте descending).
     * Если передано null то время будет разбито на части начиная с 01.01.0001 числа по текущую метку времени,
     * @param {boolean} [descending]
     * Логический параметр указывающий направление разбиения, по умолчанию - false (от меньшего к большему)
     * @param {number} [limit]
     * Ограничение splitter'а по кол-ву разбиений
     * @returns {Time[]} возвращает массив временных объектов
     */
    split(splitter, toDate=null, descending=false, limit=-1){
        const result = []
        let curTicks = toDate instanceof Time 
            ? ((toDate.ticks<=this.ticks && !descending) || (toDate.ticks>this.ticks && descending) ? toDate.ticks : this.ticks)
            : (descending ? this.ticks : 0)
        let toTicks = toDate instanceof Time
            ? ((toDate.ticks>this.ticks && !descending) || (toDate.ticks<=this.ticks && descending) ? toDate.ticks : this.ticks)
            : (descending ? 0 : this.ticks)
        let curMod = 0, modStep = 0, step = 0, stop = 0
        if(typeof splitter == 'object'){
            step = (typeof splitter?.ticks == 'number' && splitter?.ticks >= Time.#MIN_TICKS_VALUE && splitter?.ticks <= Time.#MAX_TICKS_VALUE) ? splitter.ticks : 0
            step += (typeof splitter?.days == 'number' && splitter?.days > 0) ? (splitter.days * 86400000) : 0
            step += (typeof splitter?.hours == 'number' && splitter?.hours > 0) ? (splitter.hours * 3600000) : 0
            step += (typeof splitter?.minutes == 'number' && splitter?.minutes > 0) ? (splitter.minutes * 60000) : 0
            step += (typeof splitter?.seconds == 'number' && splitter?.seconds > 0) ? (splitter.seconds * 1000) : 0
            const curLimiter = Math.floor(Math.abs(toTicks-curTicks)/step)
            if(curLimiter<2)
                return result
            stop = limit > 0 ? limit : curLimiter
        }else if (typeof splitter == 'number'){
            if(splitter<2)
                return result
            modStep = Math.abs(toTicks-curTicks)%(splitter-1)
            step = Math.floor(Math.abs(toTicks-curTicks)/(splitter-1))
            stop = limit > 0 ? limit : splitter
        }
        for(let i=0;i<stop;i++){
            const time = (i-1 == stop && !descending && typeof splitter != 'object') ? new Time(Time.ticksToTimestamp(toTicks), this.#tz) : new Time(Time.ticksToTimestamp(curTicks), this.#tz)
            result.push(time)
            curMod -= curMod > 1 ? 1 : 0
            curMod += modStep
            curTicks += (step + (curMod > 1 ? 1 : 0)) * (descending ? -1 : 1)
        }
        if(typeof splitter == 'object' && splitter?.lastReturn && limit<0)
            result.push(new Time(Time.ticksToTimestamp(toTicks), this.#tz))
        return result
    }

    /**
     * Функция для сложения и вычитания секунд (для вычитания используйте отрицательные значения)
     * @param {number} seconds
     * Кол-во секунд для прибавления/вычитания
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    addSeconds(seconds=1){
        if(seconds == 0) return this
        this.#timestamp+=(seconds*1000)
        this.#calcDate()
        return this
    }

    /**
     * Функция для сложения и вычитания минут (для вычитания используйте отрицательные значения)
     * @param {number} minutes
     * Кол-во минут для прибавления/вычитания
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    addMinutes(minutes=1){
        if(minutes == 0) return this
        this.#timestamp+=(minutes*60*1000)
        this.#calcDate()
        return this
    }

    /**
     * Функция для сложения и вычитания часов (для вычитания используйте отрицательные значения)
     * @param {number} hours
     * Кол-во часов для прибавления/вычитания
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    addHours(hours=1){
        if(hours == 0) return this
        this.#timestamp+=(hours*3600*1000)
        this.#calcDate()
        return this
    }

    /**
     * Функция для сложения и вычитания дней (для вычитания используйте отрицательные значения)
     * @param {number} days
     * Кол-во дней для прибавления/вычитания
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
    */
    addDays(days=1){
        if(days == 0) return this
        this.#timestamp+=(days*24*3600000)
        this.#calcDate()
        return this
    }

    /**
     * Функция для сложения и вычитания месяцев (для вычитания используйте отрицательные значения)
     * @param {number} month
     * Кол-во месяцев для прибавления/вычитания
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    addMonth(month=1){ 
        const sum = this.month+month
        this.#month = sum<=0 ? 12 + (sum%12) : ((sum-1)%12)+1
        this.#year += sum<=0 ? (-1 + (sum-sum%12)/12) : ((sum-(sum-1)%12)/12)>>0
        if(this.#year<=0){
            this.#year = 1
            this.#month = 1
        }
        Time.#calcTicks(null,this)
        return this
    }
 
    /**
     * Функция для сложения и вычитания лет (для вычитания используйте отрицательные значения)
     * @param {number} years
     * Кол-во лет для прибавления/вычитания
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    addYears(years=1){
        if(years == 0) return this
        this.#year+=years
        this.#year = this.#year<=0 ? 1 : this.#year
        Time.#calcTicks(null,this)
        return this
    }

    /**
     * Функция для установки текущего времени 
     * @param {number} hours
     * Часы от 0 до 23
     * @param {number} minutes
     * Минуты от 0 до 59
     * @param {number} seconds
     * Секунды от 0 до 59
     * @param {number} millis
     * Миллисекунды от 0 до 999
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    setTime(hours=-1,minutes=-1,seconds=-1,millis=-1){
        let prevTimestamp = this.#timestamp
        this.#timestamp += Time.#timeRegex.hours.test(hours.toString()) ? (Number(hours)-this.hours)*3600000 : 0
        this.#timestamp += Time.#timeRegex.minSec.test(minutes.toString()) ? (Number(minutes)-this.minutes)*60000 : 0
        this.#timestamp += Time.#timeRegex.minSec.test(minutes.toString()) ? (Number(seconds)-this.seconds)*1000 : 0
        this.#timestamp += Time.#timeRegex.millis.test(millis.toString()) ? Number(millis)-this.millis : 0
        if(prevTimestamp != this.#timestamp)
            this.#calcDate()
        return this
    }

    /**
     * Функция для установки текущей даты 
     * @param {number} day
     * День месяца от 1 до 31 (в зависимости от месяца кол-во дней меняется соответственно)
     * @param {number} month
     * Месяц от 1 до 12
     * @param {number} year
     * Год в формате YYYY
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    setDate(day=-1,month=-1,year=-1){ 
        let prevDate = this.format('@{D.M.Y}')
        this.#year = Time.#timeRegex.year.test(year.toString()) && typeof year=='number' ? year : this.year
        this.#month = Time.#timeRegex.month.test(month.toString()) && typeof month=='number' ? month : this.month
        this.#day = Time.#getMonthDayReg(this.month,Time.isLeapYear(this.year)).test(day.toString()) && typeof day=='number' ? day : this.day
        if(prevDate != this.format('@{D.M.Y}'))
            Time.#calcTicks(null,this)
        return this
    }

    /**
     * Функция для установки времени в начало дня (00:00:00.000)
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    startDay(){
        let sum = (this.hours*3600*1000)+(this.minutes*60*1000)+(this.seconds*1000)+this.millis
        this.#timestamp-=sum
        this.#calcDate()
        return this
    }

    /**
     * Функция для установки времени в конец дня (23:59:59.999)
     * @returns {Time} возвращает текущий объект Time с обновленными значениями
     */
    endDay(){
        let sum = ((23-this.hours)*3600*1000)+((59-this.minutes)*60*1000)+((59-this.seconds)*1000)+(999-this.millis)
        this.#timestamp+=sum
        this.#calcDate()
        return this
    }

    /**
     * Функция для сравнения двух объектов Time с точностью до секунды
     * @param {Time} time 
     * Сравниваемый объект Time
     * @returns 
     */
    equals(time,isEqMillis=false){
        if(time instanceof Time){
            let res = this.year === time.year && this.month === time.month && this.day === time.day
                    && this.hours === time.hours && this.minutes === time.minutes && this.seconds === time.seconds  
            return isEqMillis? res && this.millis === time.millis : res
        }
        return false
    }

    /**
     * Функция для сравнения двух объектов Time по дате
     * @param {Time} time 
     * Сравниваемый объект Time
     * @returns 
     */
    equalsDate(time){
        if(time instanceof Time)
            return this.year === time.year && this.month === time.month && this.day === time.day
        return false
    }

    /**
     * Функция для сравнения двух объектов Time по времени без учета даты
     * @param {Time} time 
     * Сравниваемый объект Time
     * @param {boolean} isEqMillis
     * Сравнивать ли миллисекунды, по умолчанию - false
     * @returns 
     */
    equalsTime(time,isEqMillis=false){
        if(time instanceof Time){
            let res = this.hours === time.hours && this.minutes === time.minutes && this.seconds === time.seconds  
            return isEqMillis? res && this.millis === time.millis : res
        }
        return false
    }

    /**
     * Функция для выявления, находится ли текущий объект Time в промежутке между time1 и time2
     * @param {object|number|Time|Date|string} time1
     * Объект Time, Date, строка времени, объект содержащий информацию о дате или метка времени UNIX 
     * @param {object|number|Time|Date|string} time2
     * Объект Time, Date, строка времени, объект содержащий информацию о дате или метка времени UNIX 
     * @returns 
     */
    isBetween(time1, time2){
        const ticksTime1 = Time.#convertInputToTimeProp(time1)
        const ticksTime2 = Time.#convertInputToTimeProp(time2)
        return (this.ticks>=ticksTime1 && this.ticks<=ticksTime2) || (this.ticks<=ticksTime1 && this.ticks>=ticksTime2)
    }

    /**
     * Функция для получения кол-ва секунд прошедших между двумя временными метками, всегда возвращает целое положительное число
     * @param {object|number|Time|Date|string} time
     * Объект Time, Date, строка времени, объект содержащий информацию о дате или метка времени UNIX 
     * @returns 
     */
    secondsBetween(time){ 
        const ticks = Time.#convertInputToTimeProp(time)
        return Math.abs(Math.trunc((this.ticks-ticks)/1000))
    }

    /**
     * Функция для получения кол-ва минут прошедших между двумя временными метками, всегда возвращает целое положительное число
     * @param {object|number|Time|Date|string} time 
     * Объект Time, Date, строка времени, объект содержащий информацию о дате или метка времени UNIX 
     * @returns 
     */
    minutesBetween(time){
        const ticks = Time.#convertInputToTimeProp(time)
        return Math.abs(Math.trunc((this.ticks-ticks)/60000))
    }

    /**
     * Функция для получения кол-ва часов прошедших между двумя временными метками, всегда возвращает целое положительное число
     * @param {object|number|Time|Date|string} time 
     * Объект Time, Date, строка времени, объект содержащий информацию о дате или метка времени UNIX
     * @returns 
     */
    hoursBetween(time){
        const ticks = Time.#convertInputToTimeProp(time)
        return Math.abs(Math.trunc((this.ticks-ticks)/3600000))
    }
    /**
     * Функция для получения кол-ва дней прошедших между двумя временными метками, всегда возвращает целое положительное число
     * @param {object|number|Time|Date|string} time 
     * Объект Time, Date, строка времени, объект содержащий информацию о дате или метка времени UNIX
     * @returns 
     */
    daysBetween(time){
        const ticks = Time.#convertInputToTimeProp(time)
        return Math.abs(Math.trunc((this.ticks-ticks)/86400000))
    }

    /**
     * Функция для получения кол-ва прошедших недель между двумя временными метками, всегда возвращает целое положительное число
     * @param {object|number|Time|Date|string} time 
     * Объект Time, Date, строка времени, объект содержащий информацию о дате или метка времени UNIX
     * @returns 
     */
    weeksBetween(time){
        const ticks = Time.#convertInputToTimeProp(time)
        return Math.abs(Math.trunc((this.ticks-ticks)/(86400000*7)))
    }

    /**
     * Функция для получения кол-ва месяцев прошедших между двумя временными метками, всегда возвращает целое положительное число
     * @param {object|number|Time|Date|string} time 
     * Объект Time, Date, строка времени, объект содержащий информацию о дате или метка времени UNIX
     * @returns 
     */
    monthBetween(time){
        time = new Time(Time.#convertInputToTimeProp(time))
        return Math.abs(this.month - time.month) + Math.abs(this.year-time.year)*12
    }

    /**
     * Функция для получения кол-ва лет прошедших между двумя временными метками, всегда возвращает целое положительное число
     * @param {object|number|Time|Date|string} time 
     * Объект Time, Date, строка времени, объект содержащий информацию о дате или метка времени UNIX
     * @returns 
     */
    yearsBetween(time){
        time = new Time(Time.#convertInputToTimeProp(time))
        return Math.abs(this.year - time.year)
    }

    /**
     * Функция для свободного форматирования строки с использованием текущего объекта Time
     * @param {string} pattern
     * Входная строка с шаблонами, для того чтобы использовать вставку из объекта Time в строке необходимо использовать паттерн - ${спец.символы}
     * 
     * Можно использовать следующие спец. символы:
     * 
     * -
     * Y - год в формате YYYY
     * 
     * -
     * y - год в формате YY
     * 
     * -
     * D - день месяца (с добавочными нулями)
     * 
     * -
     * М - месяц (с добавочными нулями)
     * 
     * -
     * H - часы в 24-часовом формате(с добавочными нулями)
     * 
     * -
     * h - часы в 12-часовом формате (с добавочными нулями)
     * 
     * -
     * m - минуты (с добавочными нулями)
     * 
     * -
     * S - секунды (с добавочными нулями)
     * 
     * -
     * s - миллисекунды (с добавочными нулями)
     * 
     * -
     * Th - Часы смещения по временной зоне
     * 
     * -
     * Tp - Минуты смещения по временной зоне
     * 
     * -
     * Tz - Часы и минуты смещения по временной зоне
     * 
     *---
     * Пример:
     * 
     * let t = new Time()
     * 
     * console.log(t.format('Время публикации: ${H:m}'))
     * 
     * ---
     * Вывод:
     * 
     * Время публикации 10:45
     * 
     * @returns {string} возвращает отформатированную строку
     */
    format(pattern){
        let res = pattern.match(/(\@\{[^\{\}]+\})/g)
        while(res && res.length){
            let item = res.shift() ?? ''
            item = item.replace(/[\{\}\@]/g,'')
            item = item.replace(/Th/g, `${this.tz>=0?'+':'-'}`+Math.abs(Math.floor(this.tz)).toString().padStart(2,'0'))
            item = item.replace(/Tp/g, Math.abs((this.tz*60)%60).toString().padStart(2,'0'))
            item = item.replace(/Tz/g, `${this.tz>=0?'+':'-'}`+Math.abs(Math.floor(this.tz)).toString().padStart(2,'0')+':'+Math.abs((this.tz*60)%60).toString().padStart(2,'0'))
            item = item.replace(/H/g, this.hours.toString().padStart(2,'0'))
            item = item.replace(/h/g, (this.hours>12 ? this.hours-12 : this.hours).toString().padStart(2,'0'))
            item = item.replace(/m/g, this.minutes.toString().padStart(2,'0'))
            item = item.replace(/S/g, this.seconds.toString().padStart(2,'0'))
            item = item.replace(/Y/g, this.year.toString().padStart(4,'0'))
            item = item.replace(/y/g, this.year.toString().padStart(4,'0').slice(2))
            item = item.replace(/D/g, this.day.toString().padStart(2,'0'))
            item = item.replace(/M/g, this.month.toString().padStart(2,'0'))
            item = item.replace(/s/g, this.millis.toString().padStart(3,'0'))
            pattern = pattern.replace(/(\@\{[^\{\}]+\})/,item)
            res = pattern.match(/(\@\{[^\{\}]+\})/g)
        }
        return pattern
    }


    /**
     * Форматирование даты по локалям поддерживаемым в JS
     * @param {string} [locale]
     * @param {object} [params] 
     * @param {object|string|number} [params.timeZone]
     * @returns 
     */
    formatLocale(locale='ru', options={}){
        let currentTz = this.#tz.names[0]
        if(options?.timeZone && typeof options?.timeZone!='string'){
            let find = Object.values(Time.TIMEZONE).find(el=>el.value==options.timeZone || el.names.includes(options.timeZone))
            currentTz = find ? find.names[0]: currentTz
            delete options.timeZone
        }
        return Intl.DateTimeFormat(locale, {...options ,timeZone:currentTz}).format(this.timestamp)
    }

    /**
     * Функция для получения строки времени в формате ISO
     * @param {?string} format 
     * Строка формата из свойства Time.ISOFormats
     * @returns {string} Строка времени в формате ISO
     */
    toISO(format = null) {
        if (format != null) {
            for (let key in Time.#ISOFormats) {
                if (format == Time.#ISOFormats[key])
                    return this.format(Time.#ISOFormats[key])
            }
        }
        return this.format(Time.#ISOFormats.DATETIMEMSCLNTZ)
    }

    /**
     * Функция для получения строкового представления месяца текущего Time объекта
     * @param {string} locale 
     * Параметр локализации
     * ---
     * @returns {string|undefined}
     * Возвращает строку с наименованием месяца, либо undefined если установленная локаль не поддерживается
     */
    getMonthString(locale = 'ru') {
        if(Intl.DateTimeFormat.supportedLocalesOf(locale)){
            return (new Intl.DateTimeFormat(locale,{month:'long'}).format(new Date(1970,this.month-1,1))).replace(/^./, s => s.toUpperCase())
        }
    }

    /**
     * Функция для получения строкового представления дня недели, текущего Time объекта
     * @param {string} locale 
     * Параметр локализации
     * ---
     * @returns {string|undefined}
     * Возвращает строку, либо undefined если установленная локаль не поддерживается
     */
    getWeekDaysString(locale='ru'){
        if(Intl.DateTimeFormat.supportedLocalesOf(locale)){
            return (new Intl.DateTimeFormat(locale,{weekday:'long', timeZone:this.#tz.names[0]}).format(this.timestamp)).replace(/^./, s => s.toUpperCase())
        }
    }

    /**
     * Функция конвертации текущего объекта Time в Date 
     * @returns {Date}
     */
    convertToDate(){
        return new Date(this.timestamp)
    }

    valueOf(){
        return this.ticks
    }

    toString(){
        return this.toISO();
    }

}

export default Time