
export function YlUIResolver(): any {
    return {
        type: 'component',
        resolve: (name: string) => {
            if (name.startsWith('My')) {
                const comp = name.slice(2).toLowerCase()
                return {
                    name,
                    from: `yl-ui/es/${comp}`,
                    sideEffects: `yl-ui/es/${comp}/index.css`
                }
            }
        }
    }
}