/** Map for {@linkcode FlagTypes}. */
interface FlagTypesMap {
    /** {@linkcode string} type.*/
    string: string;
    /** {@linkcode number} type.*/
    number: number;
    /** {@linkcode boolean} type.*/
    boolean: boolean;
    /** {@linkcode URL} type.*/
    url: URL;
}

/** Available flag types. */
type FlagTypes = keyof FlagTypesMap;

/** Available flag values. */
type FlagValues = FlagTypesMap[keyof FlagTypesMap];

/** A flag object. */
interface Flag<T extends FlagTypes = FlagTypes> {
    /** Name of this flag. */
    name: string;
    /** {@linkcode FlagTypes Type} of flag. */
    type: T;
    /** (optional) Description of this flag. */
    description?: string;
    /** (optional) If this flag is required. Default is false. */
    required?: boolean;
    /** (optional) Short alternative names for this flag. */
    short?: Array<string>;
}

/** Get the type of value from a {@linkcode FlagTypes}. */
type FlagTypeValue<T extends FlagTypes> = FlagTypesMap[T];

/** Get the type of value from a {@linkcode Flag}. */
type FlagValue<T extends Flag> = T['required'] extends true
    ? FlagTypeValue<T['type']>
    : FlagTypeValue<T['type']> | undefined;

/** Parsed flags result. Utilized in {@linkcode FlagParser.parse}. */
type ParsedFlags<T extends readonly Flag[]> = {
    [F in T[number] as F['name']]: FlagValue<F>;
};

/** A flag parser which can be used to parse flags. */
class FlagParser<T extends readonly Flag[]> {
    /** Predefined flags for this flag parser. */
    flags: T;

    /**
     * Create a flag parser based on a set of predefined flags.
     * @param flags Predefined flags.
     */
    constructor(flags: T) {
        this.flags = flags;
    }

    /**
     * Parse flags from your provided list of args or `process.argv` if none is provided.
     * @param args The args to parse.
     */
    parse(args?: Array<string>): ParsedFlags<T> {
        const input = args ?? process.argv.slice(2);
        const result: Record<string, string | number | boolean | URL> = {};

        for (const flag of this.flags) {
        }

        return result as ParsedFlags<T>;
    }

    /** Create a help message based on your predefined flags. */
    help(): string {
        let sortedFlags = this.flags.toSorted((a, b) => (b.required === true ? 1 : 0) - (a.required === true ? 1 : 0));
        let message = 'List of available flags:';
        for (const flag of sortedFlags) {
            message = `${message}\n--${flag.name} ${flag.type === 'boolean' ? '<boolean>' : `[${flag.type}]`}${flag.required ? ' (required)' : ''}${flag.description ? ` - ${flag.description}` : ''}${flag.short ? `\n    Short: -${flag.short.join(', -')}` : ''}`;
        }
        return message;
    }
}

export { Flag, FlagParser, FlagTypeValue, FlagTypes, FlagTypesMap, FlagValue, FlagValues, ParsedFlags };
