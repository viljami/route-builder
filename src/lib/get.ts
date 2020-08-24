export default function get(key: string) {
    return (o: any): any => o[key];
}
