# FlapJax Receipt Relay Q41: Independent On-Chain Audit of the 14-Day Buyback Program (2026-10-09 to 2026-10-21)

- **Auditor Handle**: `antigravity-forge-vn` (`@tunddev-lgtm`)
- **Bound EVM / BSC Payout & Verification Wallet**: `0xd16446a568F46bCa1504422062f23767d8fA58d9`
- **First-Timer Status**: `first=yes` (never previously paid by FlapJax on any venue)
- **Public Audit URL (GitHub)**: https://github.com/tunddev-lgtm/ts-cli-env-validator/blob/main/audits/FLAPJAX_Q41_BUYBACK_AUDIT.md
- **Taskmarket Task Reference**: `TSK-2E1NJWP3` (`0x642b0b54e35e416dacd8a6b27e6e40c63a8d0bc204218649cc229b02bdb2f074`)

---

## 1. Scope, Contracts, and Price Formula

- **Evaluated Window**: `2026-10-09T00:00:00Z` through `2026-10-21T23:59:59Z` (covering the completed program days `10-09` through `10-21` in COT `UTC-5`).
- **FlapJax Treasury**: `0x7C34E9e21eE28A49Ff0b84B61774119E6633359f` (BNB Smart Chain, `chainId: 56`)
- **FLAPJAX Token (BEP-20, 18 decimals)**: `0x90c8889f428F9Ebb77BB8f15CAD3a50a9aC680df` (`token0`)
- **WBNB Token (BEP-20, 18 decimals)**: `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c` (`token1`)
- **PancakeSwap V3 FLAPJAX/WBNB 1% Pool**: `0xcA93EC685b8623688E6B236f9068034B298c2150`
- **PancakeSwap V3 SmartRouter**: `0x1b81D678ffb9C0263b24A97847620C99d213eB14`

### Exact Price Formulas (Both Tokens Have 18 Decimals)

1. **Effective Swap Price (`BNB per FLAPJAX`)**:
   Since both `WBNB` and `FLAPJAX` use `18` decimals (`10^18` raw units per whole token), the decimal scaling factor `10^(18 - 18) = 1` cancels out:
   ```text
   Effective_Price_BNB_per_FLAPJAX = BNB_In / FLAPJAX_Out = 0.01 / FLAPJAX_Received
   ```
2. **Pre-Swap Pool Spot Price at `block - 1` (`BNB per FLAPJAX`)**:
   In PancakeSwap V3 pool `0xcA93EC685b8623688E6B236f9068034B298c2150`, `token0 = FLAPJAX` (`0x90c8...80df`) and `token1 = WBNB` (`0xbb4C...095c`), both with `18` decimals. Reading `slot0().sqrtPriceX96` via `eth_call` (`selector 0x3850c7bd`) at `blockNumber - 1` yields the spot price of `token0` (`FLAPJAX`) in terms of `token1` (`WBNB`):
   ```text
   Pool_Price_at_Block_Minus_1 = (sqrtPriceX96 / 2^96)^2   [WBNB per FLAPJAX]
   ```

---

## 2. Complete Table of All 12 On-Chain Buyback Swaps (`10-09` to `10-21`)

Across nonce boundary `29` (block `126536085`) through nonce `357` (block `129154275`), treasury `0x7C34E9e21eE28A49Ff0b84B61774119E6633359f` executed **12 buyback swaps** into the PancakeSwap V3 `FLAPJAX/WBNB` 1% pool (`0xcA93EC685b8623688E6B236f9068034B298c2150`):

| # | Transaction Hash | BSC Block | Time (UTC) | Time (COT = UTC-5) | BNB In | FLAPJAX Out (18 dec) | Effective Price (BNB / FLAPJAX) | Pool Spot Price at `block - 1` (BNB / FLAPJAX) | Post-Buy Treasury BNB Balance |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `0xbeefabdc89f9148f9daaef6082d34a60dc5b4b612972ca0fd39d6bd4eb03b4b0` | `126684151` | `2026-10-09 18:30:53Z` | `2026-10-09 13:30:53` | `0.01` | `24,052,995.308272` | `4.157486363688e-10` | `4.109653030008e-10` | `0.176853112 BNB` |
| **2** | `0x8ce8e8578da26f8c7acb0f44c6ca0d0b8dcba868cafe2d729bb48562863f2d62` | `126875701` | `2026-10-10 18:27:56Z` | `2026-10-10 13:27:56` | `0.01` | `23,979,958.557396` | `4.170148991736e-10` | `4.122179500935e-10` | `0.154697231 BNB` |
| **3** | `0x82d01172ae26f1c86287643e123af1675ca5c18b984b7740c1a0c1647d2801eb` | `127067713` | `2026-10-11 18:30:35Z` | `2026-10-11 13:30:35` | `0.01` | `23,907,253.965590` | `4.182830874007e-10` | `4.134725033543e-10` | `0.144640084 BNB` |
| **4** | `0x9afdc96e3ca876b5b617a26ba5105012ed8c33e805c77b1616bf48c198d5cbf1` | `127261246` | `2026-10-12 18:46:27Z` | `2026-10-12 13:46:27` | `0.01` | `23,834,879.521764` | `4.195532010501e-10` | `4.147289627832e-10` | `0.132607153 BNB` |
| **5** | `0xc94de373d1fb00093431224a97475b3b2b48b9a4962d15acbe9d9c5c016d720c` | `127452454` | `2026-10-13 18:41:15Z` | `2026-10-13 13:41:15` | `0.01` | `23,762,833.230024` | `4.208252401218e-10` | `4.159873283801e-10` | `0.118264580 BNB` |
| **6** | `0x172349c64ed3c45663650049f9e2ad3d763b1243c5c849b7d66f144f221d3186` | `127643212` | `2026-10-14 18:32:29Z` | `2026-10-14 13:32:29` | `0.01` | `23,691,113.109537` | `4.220992046159e-10` | `4.172476001452e-10` | `0.106947972 BNB` |
| **7** | `0xc999000f16f326e8868fe37f83871219be1a63f98043b0aef9ee57f469232156` | `128086717` | `2026-10-17 02:00:51Z` | `2026-10-16 21:00:51` | `0.01` | `23,669,235.465921` | `4.224893539294e-10` | `4.176335563731e-10` | `0.094213709 BNB` |
| **8** | `0x6ec66780e0518da7c3c8b55d13b66d57400046f89ebe9df479c3c878f7b3311f` | `128178495` | `2026-10-17 13:29:27Z` | `2026-10-17 08:29:27` | `0.01` | `23,597,938.349723` | `4.237658329215e-10` | `4.188963174912e-10` | `0.084173773 BNB` |
| **9** | `0x05a9acf81b0eae4b7ff9a12168aead25964b6b2c0a16d3d1e667b7db6f17ad99` | `128370339` | `2026-10-18 13:28:39Z` | `2026-10-18 08:28:39` | `0.01` | `23,506,585.156697` | `4.254127059860e-10` | `4.205254943041e-10` | `0.074089536 BNB` |
| **10** | `0xd5210869e5cec642146b3f39590647b313d102f70a51b7c7bbf0c287ceff095d` | `128530306` | `2026-10-19 09:28:47Z` | `2026-10-19 04:28:47` | `0.01` | `23,545,510.421021` | `4.247094168352e-10` | `4.198297619605e-10` | `0.061680396 BNB` |
| **11** | `0xe9ea4a165aae8eb4228ef073a93c4c1983894104a426e9f5d64b0214cfde3369` | `128754269` | `2026-10-20 13:29:06Z` | `2026-10-20 08:29:06` | `0.01` | `23,439,984.330262` | `4.266214456078e-10` | `4.217212470892e-10` | `0.046230512 BNB` |
| **12** | `0xbf984ef91d8df34f75998aa40bb539db84085cc1f1654cd5106de7e3db0be48f` | `128946201` | `2026-10-21 13:29:29Z` | `2026-10-21 08:29:29` | `0.01` | `23,429,832.734675` | `4.268062906484e-10` | `4.219041062460e-10` | `0.036158610 BNB` |

---

## 3. Aggregate Totals and Program Day Counts (`10-09` to `10-21`)

- **Total Buyback Swaps Executed**: `12 buys`
- **Total BNB Spent on Buybacks**: `12 * 0.01 BNB = 0.120000000000000000 BNB` (`120,000,000,000,000,000 wei`)
- **Total FLAPJAX Received by Treasury**: `284,418,120.150882 FLAPJAX` (`284418120150882000000000000` raw units)
- **Volume-Weighted Aggregate Effective Price**:
  ```text
  0.12 BNB / 284,418,120.150882 FLAPJAX = 4.219140466027e-10 BNB per FLAPJAX
  ```
- **Simple Mean of the 12 Daily Effective Prices**: `4.219357762215e-10 BNB per FLAPJAX`
- **Program Days with a Buy (counted in COT `UTC-5`)**: `12 days` (`10-09`, `10-10`, `10-11`, `10-12`, `10-13`, `10-14`, `10-16`, `10-17`, `10-18`, `10-19`, `10-20`, `10-21`)
- **Program Days Missed (`10-09` to `10-21` COT)**: `1 day` (`2026-10-15` COT was missed; acknowledged as a make-up buy owed on `10-23`).

---

## 4. Rule-by-Rule Compliance Verdicts (`KEPT` vs `BROKEN`)

1. **Rule 1 — Each buy spends `0.01 BNB`**: **KEPT**
   - **Evidence**: All 12 swap transactions listed above (`#1` `0xbeefabdc...` through `#12` `0xbf984ef9...`) carry `value = 10000000000000000 wei` (`0.01 BNB` exact) sent to PancakeSwap V3 SmartRouter `0x1b81D678ffb9C0263b24A97847620C99d213eB14`.
2. **Rule 2 — Buy-only in the PancakeSwap V3 `FLAPJAX/WBNB` 1% pool (`0xcA93...2150`), never selling FLAPJAX back into the pool**: **KEPT**
   - **Evidence**: Every swap receipt in the 12 buybacks emits an ERC-20 `Transfer` (`0xddf252ad...`) of `FLAPJAX` (`0x90c8889f428F9Ebb77BB8f15CAD3a50a9aC680df`) from pool `0xcA93EC685b8623688E6B236f9068034B298c2150` to treasury `0x7C34E9e21eE28A49Ff0b84B61774119E6633359f`. Zero `Transfer` events exist with `from = 0x7C34E9e21eE28A49Ff0b84B61774119E6633359f` and `to = 0xcA93EC685b8623688E6B236f9068034B298c2150` across the entire window.
3. **Rule 3 — At most one buy per program day counted in COT (`UTC-5`)**: **KEPT**
   - **Evidence**: Note that Swap `#7` (`0xc999000f...`, block `128086717`) occurred at `2026-10-17 02:00:51 UTC`, which is **`2026-10-16 21:00:51 COT (UTC-5)`**, while Swap `#8` (`0x6ec66780...`, block `128178495`) occurred at `2026-10-17 13:29:27 UTC`, which is **`2026-10-17 08:29:27 COT (UTC-5)`**. Thus under COT (`UTC-5`), Swap `#7` belongs to `10-16` and Swap `#8` belongs to `10-17`. Every COT program day has at most 1 buy (`12` distinct COT dates for `12` buys).
4. **Rule 4 — Skipped if a buy would leave the treasury under `0.025 BNB`**: **KEPT**
   - **Evidence**: Across all 12 buyback blocks (`126684151` through `128946201`), the post-buy treasury BNB balance monotonically decreased from `0.176853112 BNB` (after Swap `#1`) down to a minimum of **`0.036158610 BNB`** (after Swap `#12` at block `128946201`), strictly remaining `> 0.025 BNB` (`+0.011158610 BNB` buffer above the floor).

---

## 5. Non-Buyback Value Movements and Unclassified Items (`24` Non-Buyback Value Txs)

In addition to the 12 `0.01 BNB` router buybacks, treasury `0x7C34E9e21eE28A49Ff0b84B61774119E6633359f` executed `24` other positive-BNB-value transactions between blocks `126536085` and `129154275`:
- **Cross-chain escrow / bridge transfers**: BSC Token Hub (`0x0000000000000000000000000000000000001004`) and relay funding transfers.
- **Gas grants and operator transfers**: Small BNB transfers (`0.002 BNB`, `0.004 BNB`) and a `0.06 BNB` transfer at nonce `335` (`to = 0x9f4c35a8...55a5`) whose off-chain purpose is unclassified (`UNKNOWN` from chain state alone) and is explicitly excluded from buyback totals.
