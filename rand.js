




const random = {

    key: 0n,
    p: 115792089237316195423570985008687907853269984665640564039457584007908834671663n,
    index: 0n,
    prev: 0n,

    async set_key(new_key) {
        const encoder = new TextEncoder();
        new_key = encoder.encode(new_key);

        // key to hash to get a number
        let hash = await crypto.subtle.digest("SHA-256", new_key);
        hash = new Uint8Array(hash);
        hash.reverse()

        this.key = 0n;

        // Bits to BigInt
        hash.forEach((value, index) => {
            this.key += (BigInt(value) << BigInt(index * 8))
        })

        this.refresh()
    },

    // keep the key but reutrn the yeld
    refresh() {
        this.prev = this.key
        this.index = 1n
    },

    // yeld next rand number below %
    next(max) {
        this.index += 1n

        const r = (this.index * this.key) % this.p

        this.prev ^= r // infinitely generating [r % const] without a loop

        return Number(this.prev % BigInt(max))
    }

}



