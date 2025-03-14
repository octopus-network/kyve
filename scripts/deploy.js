const Arweave = require("arweave");
const { createContract } = require("smartweave");

const fs = require("fs");
const wallet = JSON.parse(fs.readFileSync("./arweave.json"));

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

(async () => {
  const height = (await client.network.getInfo()).height;

  // Deploy pool contract source.
  const poolSrc = fs.readFileSync("./contract/pool/dist/index.js", "utf-8");

  const pool = await client.createTransaction({ data: poolSrc }, wallet);

  pool.addTag("App-Name", "SmartWeaveContractSource");
  pool.addTag("App-Version", "0.3.0");
  pool.addTag("Content-Type", "application/javascript");

  await client.transactions.sign(pool, wallet);
  await client.transactions.post(pool);

  console.log(`Pool source:\n  ${pool.id}`);

  // Deploy governance contract.
  const governanceSrc = fs.readFileSync("./scripts/cXYZ.js", "utf-8");
  const governanceState = {
    name: "KYVE Testnet",
    ticker: "KYVE",
    balances: {
      vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU: 999000,
      "s-hGrOFm1YysWGC3wXkNaFVpyrjdinVpRKiVnhbo2so": 999000,
      "74hAWLfZgfGaLBdNAnONmRAsT0LkyQTFGlhZZorc7tg": 416000,
      "5OWzyT1suRfinzRPuGpXbqwsxlDdy4SloRLCq5gJHi8": 1000,
      "cv-M77pENN2DnThamX6gKyXxZEdPvOWQScb4IUX23eQ": 1000,
      Go2jUnC6Fc_yAmSGIc3kzs2oh7o4KMSFMSIXXQqsKes: 1000,
      "xpuZCTFOycRmBC-PmkANf33-HDW19o-60H77tr9gPIM": 1000,
      uvkltYEgzmxaZDPr3jySF5suTgG6D4zQjRQxKlCDiUc: 1000,
      "yblubyvpnYLa1x-3jjmtvYRNiEwRdkC2scR_dvGwn9A": 1000,
      "QJBBTT-nlw__CRaMrFqspx1ogeJ5iUsljxUmS7J2Dqs": 1000,
      "JhoNy3TyF6abVORGzboSB81-Zc7eY5xbVDrlI-JLMTs": 1000,
      "eL4c0MdgUobAd862dHkuKL6T7IWe_iO_-ObHy31_G2g": 1000,
      TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE: 1000,
      "UMwzq9ya-9CH-TMKAnfsYQQJchD9SZHvgScMcVL6WeQ": 1000,
      "UN1d-J8WzHQbFQRJW7y9uzE7-D0pp1xLI3jPvdPJlws": 1000,
      _bdvjDw6syi2mJgNfwEW_1BGmDUFJAkJrb36w_2Okqc: 1000,
      "Uxuo-HElKJs_JmcOxXnSShvJLuGkGfPFLmhitrXFwLg": 1000,
      eUfI213UtoIiik6ePyeR5QZlGS6E7laFeKhnNXeGaGk: 1000,
      "KcFvi2uqjXRuf1J2Fe0xpcDff11xUqS9Po-a5fDh31c": 1000,
      "1zalEomi6GEsLlBRL0-DmgnVJ2stequ3QGzP3GZRmf0": 1000,
      MHiBr7uUMCuOTwQNmWG5qNVk83WaOEaX6VoWJJByHTc: 1000,
      oOSkJM_o60nZ86BFW2E1v3HvzOzG4WALjnjRjPdoprs: 1000,
      "ze5Q4PqNR_R82tWIeZd6RS5sfDbqDAGYz-PLvqCwy3w": 1000,
      "C6UHVjiBcjgxpQstYoNW-TQJ5ofCF1D-ti-bqzDxKqc": 1000,
      "NnoZLnsCmlLqiQ14VZaE2lpV48kgo-1Vj5Yz1z4zZrI": 1000,
      "DzaBE98Ave3xWN-plFlc3AdPPryGjdj61iGqwnL3TkI": 1000,
      wPDdZPv4RExHP5I4lLTtGkMO5SVgu4zBQUGwNPQD8Z8: 1000,
      "KX3L-fEGG-XIVgFcOWaKPZnT6Om30xgpj27OcJvyP8A": 1000,
      rKvfIe0ydOyAvxLIvq50nSA5asXN7YJUVpsUPxaLVx4: 1000,
      "7LZNlbdtSdSOz5k4BfRucAA0CLRTTG85os6pQz7aUUQ": 1000,
      "GndZ9Uha_8S_uqdCGZI8zgdJv6AZu9R-qG-oxGIgdEM": 1000,
      "uAxYWwAPrfDUzR1ZBSYYV-E-L3M08zmtdTg5ZmkoWnw": 1000,
      ihTbYNH6F64rOuiVD5QwPqDM8mpYgtwi3QTknsmTi_g: 1000,
      f96PkB8ejlr8V2vMvuiBHWpTjiBIRdINUXn_SBarEro: 1000,
      LA10KNfQBFy7rLOGHmUu5qHFeZLdJU0XSfVTwBbs_FI: 1000,
      "JV8dNX232DDOIt-_EgiiWcHocLSlKZRMHhqzi7OZu7c": 1000,
      "2JBBksKzmWBf2a4V-coNadNc8SGttZuLvxN6fwvSle4": 1000,
      "La0gHIbFeJvc-3hr2ppwb2owFOd23GfCf_5YxDuo7AU": 1000,
      YreTE7yhikvi8cfuKWJUjcrf9ldg0ybpPHIEeByegQo: 1000,
      "4TEruFcITA4pUOTNsVtMCYnlRufxiO8XHrpI7HlqY58": 1000,
      TXMXncg2xFHKH9_1o7hHafb1yWPgyqKCMcTe84IZMIU: 1000,
      "jrikFzzZrrDkyew6oBoFdR4R7RsEEUAv-h9uYta-UnI": 1000,
      BsqNZfCinMIbtYKjdMLIaxSxtPL1h4jxfFfjmSlXD0A: 1000,
      WR21UFF6DTWHYuLKm1NA_JjRyXVekUukzjY1LWAS5pg: 1000,
      TG51JlpWtC7AMCikqOqjkaUcuHn2HQ2SBNP1u6BYY8E: 1000,
      LLvG7NPe02s_mqgB6crmjoaM1DVimwDpPKP5E_0yUew: 1000,
      soap_Gw7lx6vkfZPsoXQI4x_ShSjfGc70xjZu1Ry6Mg: 1000,
      Myg_rC5z6G9GyC3lOTeMuk8cPeGeKoirwd_VyV7aRsk: 1000,
      "iCKby7y_D--ctxXXzAt7l5JfqrErym4nE9yKLWPjuRM": 1000,
      "734i6YAZfO2cfxXrw6adph6_A2P-pgOmf1k4PSyNHiI": 1000,
      "icwGQoRVw4GCYQpGBAKtMTScYu2mb_bNyU-9qxzRtXw": 1000,
      "Ep399j3lz8U6iUiM67Sd410fES8H51rkxc7s-SGWMTI": 1000,
      "3ZEFXMDQ3LR2Y2fJKbLsIC3-L7vwnQSE8hJZ2eT3QrA": 1000,
      jaEeQJnIR25B5cEe6Do2APWAPB936d04KmBN5MndAK4: 1000,
      "WPN1kAsokxu2-9Zmvq8Xy1ZDdoOovylS96Lu0PBN5gk": 1000,
      "3hguGD-WSaNqzr00C9oEVvxOF6BeL-d39zC5ea17Eyw": 1000,
      "FP3-xLxvtXXQAg9wn3maO8CTqjnpOiDQa2XaNcCUsbs": 1000,
      BKHdRHmhAYMoKDJLRcIiw7FNgg29VJI1HLbNcJhjLr8: 1000,
      P_AdEra_7UwQWv3SgMcmeyhDezKCwzfjxqyJMnBZQEM: 1000,
      wZCkNcbvLtMgFFoDrDI9seYPdGHJohwA8b8lQKQSmZ8: 1000,
      ObU20MJAXesxGhMxT_61kuzTq3EV0TSYITa0EwFwyMc: 1000,
      "ms0pbvc6B4Wx4bJOLH1dAtMf-AvffYhKJCTLp7xTUCo": 1000,
      "2MQ3HGj3g7C7tIoiXTS730bz15oArGppwH0polYVLU4": 1000,
      "ucb-hAMRRazm2r-Ab_DTgFuB2bNCoegmV1-ZmTLfIZA": 1000,
      "5nqRY-3G7ITs30ocKaV0YZ4rkChUr84VFzya682mzRI": 1000,
      "C4dYJAf-x8Z2sVMktI2F0mqNPa-SXlux1tJllWYC5zI": 1000,
      "4-kjnx6rqY3qhdQqeMuLFJIfppTZ3Oqs7vQJDa-NoTA": 1000,
      "jotJOvar0HxHoIjt6sZcNm-FcneMSANAqYyzxVCufbo": 1000,
      "VdXCJdKquMZuGK1W0Yi6zk-8HO-UC85vtMhWUOroY9g": 1000,
      "ne7Y3-XkriQckIBie0TfODVCZVgC49aA4h-vlHuPDKI": 1000,
      lMfIWbNcXmZzF2GBBfsIe_WoO6hi3Z9Lf8ALz8pox7U: 1000,
      "c1hLXZjruPTm0nV8oliewy6cBHpyjsp5-SxZ-vlyh28": 1000,
      "1OoK1iSvVZMf2NkycqtitcDktiJtG6mySlbAUfq7Psc": 1000,
      jJKD3HgGEuuebbtZc20Z2EzkFZ9vXxUJ2Q7fWG0Ew5U: 1000,
      B0VxN_TJ8VS46MtdQL2D9qKYf0VkVc_MjX5r36ER6I0: 1000,
      "AxYa-OXeonC8_7CpAW7Pzy9L7e4y3j05x0hG1iXIsvA": 1000,
      nEJEoU5vKb2rzGqp4P_k5SVvp9h02dUpAk3TqSyHu8k: 1000,
      _pkpcsQC3Ko8KoHK4yNe1fPAtLke9IkTRVvAp24gfTE: 1000,
      M6vhY28qfXFtA9FA4WYybWK1vlWGr3ynWK08mjyc6Y4: 1000,
      b8Y0DAA5qZ5fvIAeuxnDfIoorNHu8jtLU1n0wmSwcA8: 1000,
      "QKqN-Z6n0LWbX9j0n17DqYzcoH6o4RcQ59l9YUI9oUc": 1000,
      "BVbTJH2xOqo8PulI1_mrd_LF1Rr6O02d32BZJf8ZM-c": 1000,
      TyFByPOi_JVwqTGpK3oweYLBtYFf5HmRoWp3cC6TnsI: 1000,
      GeGQsu26ZP2LzXhCRyrDCK92kVBOIGrLQvQlU5VBdHA: 1000,
      eosQsxKNy5hMLzQz5dC7i4d8Si7dPt4CEPto1v7Es9Q: 1000,
      Z9eAMiiVp1k30XCMrjwHPDBzdK4sRiR8rP3LrVK_PdU: 1000,
      "VK8HDMICUO-NEJNk7sDEzzDPI5NZXjC5KBJAdHDCu7A": 1000,
      "cCghzKtaL89bKFIrFJQW53Beyt6rMgOOd5ff7kue-x4": 1000,
      "8_0HpzMpKFx9kyltt2M7QcYsPHPM8BM7ZkYahY49glQ": 1000,
      FDAU3o7gAx46onUNf8waoQRoIR7JlKwAmG_9gOhrhbU: 1000,
      v4dXP04WYwCZl3P3zZGLctMGfDkqrLETg8q0VjzIEXA: 1000,
      "GjbeJnzZ0Z_jhOQ-4vt3zXLtPH512w3-0fd5gAp8Nqg": 1000,
      "2wx9abXEMWvzzCmj0LQ7Ve1L9qn966chHZ_42vOXtdg": 1000,
      ByqfyUvMvd84Vm_UU_b3zd5vKL2hdEI5vTHqMzqEKbY: 1000,
      "ac-j1qMUXDgDxpqv5u96SSWn7pCLpKxdLvf67JxRBMs": 1000,
      ndQl1O2kRaFOb5ugkNmkmmVZ1q6h0QhrQU_bhgT2u3A: 1000,
      "0-NWoYw4Od4Tmw0bpZdJC4cHo7k0XbyziM_YL1NN-_k": 1000,
      XBpvd1Eo5T7S72j5uRSOZ_OHOlieC1CS7zDVNQZ5ghA: 1000,
      "hBb6DW4CeB6A9cqT-JwNQDxbosJ_FHSnuNqtWeQ7wug": 1000,
      "0bTbg9p28PK9djt8sW_ri17BkwRtTIaURZD64jEq8aQ": 1000,
      "YVwjCkk69Rzn395JkPGAWOUQ7zvUg0EVR1qFF4-R2Lo": 1000,
      qs4ilm6p3gU3BCPOzOz4WEpDNP6_4O9PQvwpi8I1x3Q: 1000,
      Lc9hKoeW7evGp8dCdpdpUYu1VFUW8Zc_Egj3a0IgVxY: 1000,
      sI0XnnOlifS7WJiKqAHuAb_zbMVYvoYyaHiSGhJNwak: 1000,
      "syoJvy56npD4zPTuX-pxgseRasTcyneN3pFGF0k03x4": 1000,
      rVie66nCUG9I4XTdK5EW5hVmSnjA4TvfS28nm_E2U3s: 1000,
      RAsIw_uRkYTVBdKRmiG6xZgWy8ZrJpn0EyCYbFg_b2Y: 1000,
      U8l4xwRy8pCW854YtJdPg4XayRpzDTERtYZ8JXbHVlk: 1000,
      "RnsTqQ9qXJOnU3b2TeEs6yeG-koJS_jBtSqBioZEAJI": 1000,
      DYegkS_vuZn5b7uDeZlyyFtaUIUP409fIeQIcXNzoIY: 1000,
      kaYP9bJtpqON8Kyy3RbqnqdtDBDUsPTQTNUCvZtKiFI: 1000,
      wjEbMuYmm0e95mzWtL9YpbW9oKBGlbFX7Ye1k9rcr1M: 1000,
      uYZRp5udvNv5lcWVxuXsNE8rR5BeArZf8WFSLWlwdGY: 1000,
      "3wizS2roUNJa4h3uN4MZomdwfB0ZE1Vt5vITtbbrPaY": 1000,
      "5FmrzdTs7znWOMm_OWf3tB2QbU6K-iyqyUsdy112KuU": 1000,
      "MrXL5R9uU2Ey7YlJiEpq838iof-_HKHZ0azXlYEbBC0": 1000,
      "n-1xGtjiVIbkbTmxwnaCtstk9pPgPqbPr8eFRp-VN60": 1000,
      "AxLrPxmA8GU2Vc6EFI4ci1EmpfFxiauUMGFM3DdvR-w": 1000,
      Fz5rY7S_MZS0sapH0sQ0M9y6aCUWAXI4ckgA21jrBrw: 1000,
      "vFqkSeOEt0_IcdnS8CMjm5ZFpScN0Vg9Dhj-m6zAyGI": 1000,
      "_PrMvVTdbNkx8T7q2wQuqHvtoPMeANAR-L-jn4B5s6U": 1000,
      "48zDZvQamu2wmjfqvhxHUJXR2_CkaznN1T-rACR1a7M": 1000,
      "NCHjY4uT2Tnt4Jq9VryZI29hU8QZkX-W5mbYA6W1Qsc": 1000,
      "KjfMuqS4St8um8Eti-Ue0qwHPd40DrAj5muAD_PZvAE": 1000,
      hp5A9Duj0brRXNFA3SgjR4XkRxRpzLDT24lseZuZ6mg: 1000,
      Uf1ZvcKnTlnufr21ExRZJw9dgvLE_JQV2S3YdzpCseU: 1000,
      OXzVLb29AOm3d9eZwD9utC0ov04nxq1f3QjcZu2kjc0: 1000,
      GH2I5F_XTwHu4ys0PJZ1yQD0wuEecmtgbGTVfer0WC4: 1000,
      "_WuCtxisn6g_SCOH4cUwDJ0U_K35-HXeTDV8XtBvDAw": 1000,
      g_CLPoCrCTKwTEvCkdsYtHauhDexwQMxQnRf5EaOIRE: 1000,
      rBlJOAwMWzQOkKu_Kj8BkwR9BV79clSk3hyPHSyiQG8: 1000,
      "O6pzH-TokTCuWvPw8tB_HH8HuKAw2kVVa7CAAboDvMo": 1000,
      "7pKOGUkcJ2MCTIL1qWyK8ieUWOWmy3tBAzBLbFqeRfE": 1000,
      "scQBTLf-CpqCY4qVM2ucj5YVyMAOrS3d1_SW2lfB_Yk": 1000,
      FRKRqxS15R6gV_XpANwuQ3EyjzAdms5axZDFcHaW95s: 1000,
      U1FhMfa6eJlLfbtfUAeonBVjg7NvWTnmP7tUlW6o_70: 1000,
      m7CbcCpO4RGh3yzKbgV2vmGs3f4vmWX7X4pHzttuHYA: 1000,
      "WgTFwKU3Dc6pXAyJK6VjMYNkSfhmA-BL0k2sFO5bRr4": 1000,
      "pSRVzok9Sshr4GUd-cgXcEb1uPmzmXR58yw0TYB6y6w": 1000,
      blzozxckWuEJhsnpgeWZYCoQlis8pIjA8nSTkKatEhc: 1000,
      Ixug8Y4qrRLnjz6nxaH3ExEeIyQRM7mYUf9e96zFHro: 1000,
      YuHthVFab6SS9SGcGqD2rZyp4fiXWKbfopBiNIId_ho: 1000,
      "Pg0VUxYiKotOSTELH69RZkGM4kMGxG-QLpuCs3C5eSk": 1000,
      "-BI6IYl4H5dNJg4hEMW2EfAO6Qaa4CQogyQyoiUAQxQ": 1000,
      "E4ExqhK0d3ay7Nocg0bGWCgOnZdAsTvegA_-KJfWKRE": 1000,
      "y-4WGA5X-alh1igNNk5cyEO51BqLQrb7Rv-3GyQ4jNY": 1000,
      fHO85uscDSUtpDuJXXJ3g_kueyfvJuaK9TKFHST8pXA: 1000,
      "MvwUeA19UOYIXfjj_89hv6gqU3erd41ikN-dBbSADCc": 1000,
      "Xio-ECRHdhodaZTPRSXI9yIwGo641MQCEPdjEU6SMbI": 1000,
      "0i6TLRlGuHc3_PbwYxeF5m0jDEnivd8SkPAliNAPbus": 1000,
      Gs87jx7ePPpZxR0oHsieKgYo1KOcLmq9nbfg3sIX2i0: 1000,
      mDDf3qDK8XQACciOvoah6zgfdLb6DIKosoLRDrb36xE: 1000,
      "7DRXZaBz42VMzXvNgP3SQ2sGc7aamDAs0GokFMQF-AM": 1000,
      jxZ4fOdYKjGz2VS9hyWcUy7IcRD4t_2BkoIaP7Ui778: 1000,
      "stqwEr-8S9o6DLulCy0_m-yVlc1v8GYCfcWKwkSNB_Y": 1000,
      ILtHXBonwlA6DidM6Soqqvz_6vWcrbnUvZR7lKWqV8A: 1000,
      et0P0iFWakSKnHnVyxJq7svUfUJCE38zM0Zv2n0ZYs0: 1000,
      JpJc1tcsXG_ZEV6ba1cZkUCxNGDimKDqOX43qWCTg8s: 1000,
      bcpjGzg_4HKFbUOFwXwYGSBFG1ekZ4fxICfyEd4KI8M: 1000,
      "vrlzsVKPGri2eGQbrDnYPHN20S3tKiSEI-E_GEkZrFw": 1000,
      "6ucOoR_J_IXFNgtxrW0kvINLrMpSYV35nDkgRPOwM5s": 1000,
      m1JpAI57adOXL_nJdtmYYYt72BbEu19Blj73B8urhSw: 1000,
      "wGUcCiKgk81QHoHM2XJ3Kx9ucZJ_F9F-G896ch2dPZU": 1000,
      p_MfAkluybBoK8UH8KD6_1oP1wKZEE5xjBL5qi2Q97k: 1000,
      "NKIuJiN90UTPqNT3HAfeB4mVw-RTCOwohi80hBVDgyA": 1000,
      Nc0JCokF5iwdcZYUwDjAj3maxAWzd1VualLodNef_Ms: 1000,
      "7iF5Jj63f34iATkUmCY_O1ZP5HUOYxZPQUoU4OB0VKI": 1000,
      "rcU4rd1uKa1ck2p2RF9WHAt67GiAFzYqlVL1ogyq-pw": 1000,
      p1SYDbcLRlDtUD5cXTKweFu0PVUMTx3h3YBrojsLidI: 1000,
      M7re9GiA2bc0oQvLXqlSeMifDfUfizG_6V9g020hL_s: 1000,
      HKPURYdnBFVfEM2HtwV4vMJZSY0cLQBwpyq0JvKJaZU: 1000,
      viFsz8YQWdltWKMtZiKGP1v2BW_nlY4BQ5CleDGX_0s: 1000,
      "FtrD5oG08YFzEhEzjDvB7drPa08-nC4LssH7My_5-K0": 1000,
      "Pk3Gx-9pmpJNlicnNHxRWrziVilHjnz4WVdvBBHeHyk": 1000,
      "68Irjx3OYkmDrCoW8YJpZOUjXW5cygRA7tB2LXXoHuw": 1000,
      "7egPj2Dx7yE2uVVlF3bTfOy8ShZRdgXry74U2MMqbXM": 1000,
      "2oUepUQZGaq9TkR3cNGdm-QGm_XoVF8xdlgj5XAGcTM": 1000,
      "5LaaMdy0k7zwve7LHOOSy1UqFU1zc-fbIetAtojXo0w": 1000,
      "NctwLwthOu5pacUeuuJFKFupd0cwd3PlC-BEMeNoRl0": 1000,
      lJHJ9XuvBHYvNIDBxXdajwk0vOOHsi1q0MaUn8XHYNQ: 1000,
      "wY6CVRC-K9lW4DhsZDJETASOLqKxNspNGQwGMC3jXyg": 1000,
      "9HjiHdWuloRBIY4_06mTFZUc7j9tnr6mR4CbKl4F49w": 1000,
      kMLaRGcuPpU9K6u3F2L37JHaibK9WiLQHehC_Z3B7pE: 1000,
      "53T3fUhzVQkG4aP-eMQieypwY7MEVwOP80XY1PufIGw": 1000,
      "6LL7EU-CIVLSIYajnFelAQi6Uefv4lqrZBcv9bNwxFI": 1000,
      YAD9UFphgbN7ChqB0Hc0_qmfco5bWkWN4Zxw4HPg4js: 1000,
      R3pyr94KtaIX5x9YsDODV5cJ0mWjTsbQEYC7LB8DdKY: 1000,
      zv3O9mYIsyqIlKNkuRPoGdxyxcJWCFGElVv9y5oVe2w: 1000,
      ilnKoR2uVAEMZkUP586mnK_IKUK8ALafqZbh1G3NAgM: 1000,
      "o0fVUlvUH7BVfMLlS-BvX7xyi9bU6qRWWPmzBNqx7Cg": 1000,
      "-5Wi_avMpHAgHykpblIfsKoxoR8yG-P1l4l2nSpCJNQ": 1000,
      "tlnGqxUXt-5_38o-ZQVmTSg4dH-5G_7GbgykRX3UFI8": 1000,
      "0aBb2lgCUiVBv5h4SCN6OjpTNHGeaAtWVDlRi5h5qyU": 1000,
      "tTGWoOBT79BdLbbGufnKTkLg8XPN37n5-lObDQLEXS0": 1000,
      e5tg_piU32KIrkn5d8auDeif5rgfdYWdjoKSovcocmg: 1000,
      "Q4TxdQ-tDnN4iavbH4sOBMO-bYyc1avtGYvMwu5KQtE": 1000,
      xQBjjWFhS9kVm7NJgfPl7Fb6NCJBwPm5HpLMHlfJft8: 1000,
      "60ClqWAa3_uz-qx0ZbqRz47kjoPHifej7hJQIdy4iJM": 1000,
      I68CUcrvI3SI8UnHvBrkz8zvpyYV7oR36XyREJRZtK4: 1000,
      "N4W6ZwQrVe_c-p8R_yLn8wnKhPl-Bom_7QEML8jPuHo": 1000,
      JJp3zizew_2IEB7cSRy8IGFBulOnc9bNq5UubivOfXM: 1000,
      hqWNgQqoSrLBRxuW8Iaedcf_oFWc6K_cXsE_g8kCMiM: 1000,
      gmXs41570O623vldfxJv4pxnLfgHuKM0SZL7fY7cPhM: 1000,
      i4Of6kHjQaMNYeRPnNkc5snYWR8mj1nHAMB97pwnTRM: 1000,
      "q3j-Km7bpzqtwKMKELn_T4ULjEYuVQvzgMkQWtS8Bno": 1000,
      BC9OcrWV_MnNEo481sUsjy52XopfTGPGDZ7Jn32Zc8w: 1000,
      "u3M3m9AFJqkqEpYzNgVKwh-QRq0jjUjf4R48951zBRY": 1000,
      "uTqY-kR8IpA9IKPzzDvrYzHPzMdC_D9Ubf79nAU-KCk": 1000,
      "2vsW8GHVWtlsjZltf-c59uor6BCx0YaCSIZ7O2KrbkE": 1000,
      k04jXXFLmhH9L4SaXET4wTcJMh5RzT6i9SSRG48P5jM: 1000,
      "qC-DFvOCoHOXc44tH5hZCiK4wOROc44zBnaT5vyJmVQ": 1000,
      cxIuy7Do9rrs8SlZJxfAKcK2qaTEHdeoObiNYZy2XmM: 1000,
      _T9anUFRKF151KwA2yfvk2KiYiBcisTNhs5AAeFNSCw: 1000,
      "kYEBWhhrcv-fXEL4YJbzVQ28S1QNKh77Y2SyANNxZDs": 1000,
      "fogYy5vM-QoVCBFK1jkxlAgTcU4rvonWtT84nLl8_Vg": 1000,
      "fpPLJv0gar9T8nJG-lvkliJq-ph0GBrCKep-ZmQcHac": 1000,
      "XfAuixvovsEtPE-pUoa77hTbu8d1yzd5UG9EuXauGXg": 1000,
      "hnpVQeB0rYGj61SVHDVURfAPZbpLMWqbfjUaJ-GlbuI": 1000,
      "JjnRBnrSg1Jm_aKZaC5g0hfTtJaKJk-5gcGIMBNaFcA": 1000,
      "A8jWLJeX4IeQRvkMkdbeAaI34CiNRNPLXfVK--LuFYE": 1000,
      "_x7cyrjwL3nq49Gm-uS3FcIHuz2mZAV83JCUukH21dY": 1000,
      XWpkVgzTrPVlYcsRE4GdXhJG5ynQ6hTMdC5RzGk_2FA: 1000,
      "n2-quZHCOjqiV-LuVBZ8SFh1jlEAQrAErPDHNr-v8y0": 1000,
      "8noBp-XIRf6w_knXYswl6k_dB2VvwikA0VbEWFs4fQE": 1000,
      u3K6cIduArBtLfOLD887jt34u73jS7F6aQONJHnX8XU: 1000,
      "giTRLQCh3u06S-dYYf563zeFdCS8wq6VeqhzKrmdYrI": 1000,
      "tYeTERdpNZmJkjjYEqhmQ5zzN5sA3tRWMPFo_l-4M7o": 1000,
      fXUU1kc0PCHjQTxg2lhSnG3uh1JGzsJJczomPxmlHwY: 1000,
      "adWYIr0WDIAP54mmi2960mJ-dRVdLbHmilq5CKsuGwY": 1000,
      amv7q8rb3lKHvpDBuS6tgpppsrrjESx_5fgtjFKEPPY: 1000,
      zExp5MNcXadUsyp71SBm_qj3E8QOOUKnpBHW38iSQGs: 1000,
      "jYUJ7YBM-WsB2AC3y9ROhitMyFfWAg6FY29bbXaFufI": 1000,
      "jBo5pZKlO-iO_0ZJ72A8dv6JmlxQ559RQwyN4BxA6dw": 1000,
      "7EyO_gT7Jczqek_WZinJSyOFs_WV1_fSa8H2VsFLqxM": 1000,
      "ctyPBh16KXA31opBVbt_UGtsSWM_FtMYixH1PTyI6-0": 1000,
      "oW42EG8PYvByCBnKm27lX3lqQk8-jajWs2qbkuo37fA": 1000,
      D6UCDChSX2WvvrxI3bB29rrwuUBtV73_Yh93RTemJdY: 1000,
      "7hppJPPo5P219YxMP4NdgAr6kJwdhCPcp9tkUX0a4X8": 1000,
      A0v36iqPf5Ctr4MpMUo0mOZiJrsdbBfiylP63ptMUzw: 1000,
      "4eWrGSxfIPznz0pAQnmJnN3PjIBLfmmq1As4qGQj3vw": 1000,
      v1IJRFQTdf2zsc0AFRA7KCMAqXAYNrQ4ceutXojW80s: 1000,
      RF_hCIOAxlP4NXeYnceHQJiVs0xsUGNpkhmaExMTee8: 1000,
      AGooAujAw49etgiL5boBEpQN3g16JH9pz5s1548Tckw: 1000,
      "MM9oSkeaDHWKAHj-qI6Oz-TZikAX3IB5B5HCSt1jn10": 1000,
      "ptbSkk-iica40ayFzGLCasCSTzv9dn4Eri3odC_sOKQ": 1000,
      a1tlJttky9qWatRovDx9LhCpTAGk3cuGiom8ueeE3y8: 1000,
      gntrX_DaCLG2F2lVPuwb5b5rj9N_u3FXHrRlBTc8M4Y: 1000,
      C9k1HzxxvFS84zDhW32JlmXB79hv3PFX5S4pQQZ79dw: 1000,
      "pYwNgW1L4WDqTlGUTsAsLOy1X26LdIL-cDF5klLcef0": 1000,
      c9DWhLAXaPg9KJtXWHrdRIETq8p5fuAZzEM0Lm0HGII: 1000,
      "sCTH37Ky1uIPcLt2xK5P1KGAYf884-bn9dMvsrHk9ZU": 1000,
      awpT2y2JvULrX2Tj7d9LTpIi7HGmpBzO1D8S8CUdBSg: 1000,
      lZr2vGQxK9hSnjmCJp8tJ_IVsGjy9z5PkD6cBYnPvUU: 1000,
      "8sOC9NnvIxTlIg9FZil5QPVTKcreoDU_TjQok5jDO34": 1000,
      "YzTPDCCfTEDPdAQf-y9BHlibR3JpNB3LBO6lxKmxDhc": 1000,
      "6SXEQpmxbmuQ66IkqHv7Wi3wKOmz3eDbsTPYVdd-CdU": 1000,
      "6eFT0FnREYdAYAd3X6MPBVQ7ASbqlLNpDtZksHJ2hCE": 1000,
      Dv74ofWm69SRPFSqF66VzO_eOBT8HCED0WVP6amZlS8: 1000,
      M4dncl74MoJ8FyZzdTH_DmreCTDpVpJnsmSKSbJKHjA: 1000,
      "x2-CjWJmCRyphSQDjba47IljAYc5A7bX4rlQt7gf95k": 1000,
      "04NugCOxPB0wz2RDg7Uzx7iFn3W1qbT_sa6wpkdXrOY": 1000,
      "rIMi0NAb47w-5KfH3Sm5csv0P6IhBnxiKI2IB2k1gpc": 1000,
      "d9_zzOhhe4BTbch-IG7VKglrFxfT1ivXKSuNtwpod6M": 1000,
      "2Lf6AAl49IDRxTNuVHQeWCu4rRwWCQ77FlvngUMmKrI": 1000,
      eZFGrJhNf191QQJc_Pj4voqhFzJvP4mWNHcYr0OglZk: 1000,
      "jAVGiq0LqCSIZj6jGUvBSlaY042c8E_vRQ-AVhwEkuI": 1000,
      XZhUBWIfQLCfrWJvjaV4DYEfckJD9KkpV3a7uMLWsfI: 1000,
      "x7AporHo9WBH3NURO8A9erC3HvZm-vPqb4wPrscs-Iw": 1000,
      L1F5IPNntuM1OIDWMEgEzZP1sURTfSEYJdB6STqiG_g: 1000,
      hkfNlKH0qnnOlJNdKMTdMtP8VRwZfBhUx0mpuaon5q4: 1000,
      nL2ad9hms7HSujEmgzH91aq0dMZvkqICn7oYmWuHBfI: 1000,
      "HssQwoUR_EoXL7sezDjkPqcJyFeV-wnBDjV-p0QzskA": 1000,
      sGS3A_sFc32ZPNzWy5k9RtjknDHSgeAZx1EyvwSGddo: 1000,
      ceNFs5_dYKBOSzoQljsGaePrEySAAZMfQ6EqtNYuteE: 1000,
      "0vZK6-e2ScCbHqYFpgWbIxnnW7NgWgfexpmoLuyenOU": 1000,
      "3fSSTd0J4-wpgib1g2zJE84XBoUqe148_95tegXK5yk": 1000,
      eyQG3ZY9EDxu0GE2CeggfYubUpfhQdPqGhgebK0pPhg: 1000,
      M70TGaLcYWJddCYoPw1fa4bp6S9DmP_msP2DDYepkVo: 1000,
      "tovwH1I9aj2dYxIGU9A05B0AxVyOkeHD-lbUO_rmvS8": 1000,
      Qse3u1HNJ2U01IpdYupJ1lgr5Kx9iEwWKJlJPW6WGeo: 1000,
      "KUG4t2EdvlDswnK4cy-liNWFfAM_ajCmRH3D3avZ71g": 1000,
      "1wovoBRUR_k735sMPZC9129JdgTxZdZ10vmrQVxRYDA": 1000,
      "wn2pI71Al5t2fl0VGs8Str3cl2K4XVlRH-u1-6pnvx0": 1000,
      "9iBv4aFcYXmKL92B0msEk81yeKt8X6bDmimCDjzU1WE": 1000,
      L_kawJnoyrL1YspEqBskDiXk4oU8DN0a12zQvnV90OA: 1000,
      "3s33KRGW9qyDCVCSeN_SjwCaCEk5hrtcBfGVmCJrPB8": 1000,
      "DZOeoAuUXuU8JT7yV2RU-5FndHVOQFEyKdNBov7XZk4": 1000,
      "-Vz2t1AsFFjoXK_8z-S90spmItR1lg_MseDsBSJYn94": 1000,
      "tjLt423mUvZ7_MAEOGXn9sOnlfc7sB--zHNvH1Ut0sE": 1000,
      "x7mXR8swgn4TrH-oe3r26TCnxZhwJMGLdHrGh4V7QB4": 1000,
      "EGxuDtoW8AFPM6fawp-n7TXtrbysNuIcuuoDhO6oym8": 1000,
      "x80z0Ztc1Q3lh0j_8vZW-kkA_pUkbJ9_A0311a8xsB4": 1000,
      yYVzfbLRPbdZjv1pRQ6WoHpqChkhZFv1trLnoEqcuns: 1000,
      "8q5nGRPxQSqCCsFVqSgisjoVc_Mflb6VkzS-FjhJ_og": 1000,
      zwMpyoY3zL1BlmDTENz458MVtGfChfp3YO6_afHqLHs: 1000,
      "vLMktLo0kB-mHZRbxCM1BNR11N9GjLtUncs9z2fTnXw": 1000,
      "hb_ODd5aSClAFIYIFtVsE-XYyR-TreTV9Hc7YxS4o-k": 1000,
      OkJaHIfWJL1E04VwX2e4qcTIc9UDZeU_2Ev22Eevuzc: 1000,
      "djDUEaHqJ9fVo64Ldn51cSpfUF9-vcNuT2xNiDS2eCs": 1000,
      landHqTas_1abefQTOgEet0ekfBUzybER38g79MquDU: 1000,
      "uU0xuc3D33ZR6kax5m5RgSXwRmxgWU_ut8-2kSNPZ8Q": 1000,
      oR3AsV60I4J_AJpMFJQLSz6_nSfB1gH4AZePgPItE7M: 1000,
      "4newNYDtwKKTlsmdOKsqc52-THdJqjicFfXCaDMOlAg": 1000,
      JE16boREBZlW35piGFXxg11yyNDsz8cRDwEbq0Yhk6M: 1000,
      "7n0jJbnueWTLtlbmpIKlfnvRJd73KN4GKIijwc5196k": 1000,
      "iv56-0o7VDRiDTUyY1TLm9APYZf7KRVQyT6Fya8XxOI": 1000,
      aOUpMQf9BCSJamud4yO1TROBRM7iMdq1UbqiUaxyey0: 1000,
      mwcqQ28J0LSEaXC94lzViQKfOs1GaySTZAqbAheJb5w: 1000,
      "-1bsVev-CQPqDfwCyE3hzI4SC9JIyTmJomGCnNLeNBc": 1000,
      ZON87wb7TefuI06HOesLB3_AP6fMsqMUZZypZf9StsM: 1000,
      "OXCJs-k3HZnVgu5p97219aWkE06pnAvE84VHO0y-nt0": 1000,
      "GuTckFoH_9B72IzUaN_5jiFtR-Qe9UJZNXW72xZ7-lc": 1000,
      kWwf3INpI0D5mlIxJNviJ7NyvzYsgWhSBDdFiBerEYk: 1000,
      M6tX9EhDnpvvAhLuZHp7aNfi1ENOiCsRLpZwfwxgEOs: 1000,
      "hur8ZpQ6VrVlUOfw3qPVThb1oWCZyBjUDT_Jau6Sr-s": 1000,
      "Mt2hJ1O3CzIyREZCiQ-lcDfuaDrDsgeKnPCHPqHawFU": 1000,
      MEzlyQZgMt83Xdxvzva1QOPafLLUhBI5NP3bfHFpZ7o: 1000,
      YmAALC5LeHemJUNwI3vlndIK97DZTOePR3MnGHGUEwk: 1000,
      "vax4Axh4NV8XcJ0-Ey6Jral5cVpKNrPOcGg1GJqik8Q": 1000,
      "oLUCPTpv3iyqsj-0TsAfR4_Nj4H3XYz7RZ463VZJStQ": 1000,
      "VM5hiTAFQ8vj7rjYWeD-H3x0HwW4ppvicp1pBDIec0s": 1000,
      "-wpkdSIiHVw74YHKeD59pZ8oDpK8yjw5XN6xMtvZPRE": 1000,
      P8idSwh2iXs8I2TKLoTWzZcwyDGuBIwWaoEY8qfPqr4: 1000,
      "RypwYmJyfTjGzHq5PLr54U1pya2nwS_-Bkhhva6wmiM": 1000,
      TyB4GTkoJ_nevQ_fM_rNGPvmsc21XXaCuA9Z2DzaLQ8: 1000,
      "wq0ZRfqfFRObq1m_-8uOOVQmEj1YieXtRgVgSdxBi24": 1000,
      "1IzN9Um262mhSc4GlecaHC0ox-bIt80LIGrOCRhrQjw": 1000,
      "OXxH22JExBVot6gHdSqYdu8e2oytTPchh-yfb3T8MeQ": 1000,
      "6IaEmE9H_HJ29PW4ugoKeYcOyjlOh2T7F4yA8_iiaRg": 1000,
      HpXnZAFE3SoWf7gtZlfMicr1apkpFYtdYuH3qdEqlIs: 1000,
      "MazeN-RWK69lN_AD7N1MWQz8gPjXAUpp3RXl1wmRKnU": 1000,
      AULezoEflEzCMjEh69dFQgp_mWD35Jt56IKUWLHGXrg: 1000,
      "6k0MRRf3nEK_PjdB0LtbzpYtYDy1zKGp2OfNgwqf0iU": 1000,
      ap1tnSw3c2_MmCMgImF_oeOTBJrkd_jPZx62YHaNhzc: 1000,
      "5iqoFKg41jDt5-PygKuZnj_k--d8BSH_sAYsgwnBEb4": 1000,
      cVKFYIYeLCFxaPhgY56eAsq5vQpu_qDXGXlMx70P3YU: 1000,
      "8ASmB0N6vEj3eZWHUsDHeCsobUlrPxpepyhgOmhy9jE": 1000,
      j5ouL6u39sDIwt0aAcf8Aj9lVoYsLxANlG2gRcZ5V_s: 1000,
      R0QlsB80jP_vuMLkWe7r0VYlzaoQYFH4RBB1X5sDzzU: 1000,
      G7Agkcmf4ye2EvFe_w7kV9pjRAfP1_OwkA7LIwob9Oo: 1000,
      "pWVXU2j6jzo-IWVUkg8fL-QtJj-zmvj5UWm5pCm4E5c": 1000,
      "y5Z6mRExEXBN3-p_6ZrwEveNwoek_WrUzyl3ekuKGtM": 1000,
      hzApN2vUPvDGkmVr26NiyutmuW3AI2MFHAr4z_skqgo: 1000,
      WQOlBCPeVqyA6HRbJJGsJc6ORHyMpTAwT39kHZwOF2g: 1000,
      "fZXESwckqk25rjoOvUEGW-bKTMoBvsk1P6P_zhCZDuU": 1000,
      FMD0_GhgeHzBUjRH4lWpIxTVNT9J7d_o9RZvvGHgDlg: 1000,
      "gXerPg-Khp1lZutojXKclRR-G1nzIDEO7n14HK_snjQ": 1000,
      fO1ArtsdRZP2g0qsIUrDemxBg8SKCTNmo_Pg_qTJNJw: 1000,
      JgaPVuIbFeQJaIkxT1sA4EgTen7VBTJCqVx8BBdrqqw: 1000,
      "VX5qDpex55-5sz02GjTAlHVMI_uTIithkEog496UGP0": 1000,
      "iqGIvRBbX7miitwyNlQg590rvu1-HAuWPNuojFAynVs": 1000,
      WJibYH2ItSO_juF7EMYO8UgP3IC4hK8VhesTY3adESI: 1000,
      feqhibZzFwlsQiwjh5XTJPHAJvbRjHoADjtDMdOvmo4: 1000,
      "354vR-ByR8fVll4Pp-xlOAqYOSI4QiMuh-LSAWMJdBo": 1000,
      "xi3ZWw442-nafCQKNX9mY_4EpRr3mccO-eTFKzB2_0M": 1000,
      "ZgmrctzosupSt-8BgKUJ6YlOs5lds96HNjFV2BzMpVE": 1000,
      sIJDKTI_7G56DIUMfOEtgecp12cuzYmaQuY_34UonlY: 1000,
      "6jw62a-EGfTIwR952bnASsRQQYBm3LrdkdUX2LKdx-w": 1000,
      "7wo7fZ7eBmWnulxlyL_fyqBlrQvi4lXPkJODKwS7fjo": 1000,
      "r6t6UZHcXgb7FkRf7Vmzfu7Ooasgd-C5KbrdDx9cbKo": 1000,
      xjm4JlGSPtKdmhq3ywGR_ub4rc5od5F9kdHWT2HPOHM: 1000,
      z90vN9pCTvEgeQUf78lchv9baqMAkCtlU5TO3ueAAJM: 1000,
      wBaYwRNqjoWMYJr0MBCcy2RurluXh_PXZOxP45bw37M: 1000,
      lT9bqc7soW4kBLcuYhsBlAbNyrVTksr2lTk3GkPxJB0: 1000,
      "7_IePCB9_YYczUWT0zpLyjB9HYXp2HltWbVLfP0YkBA": 1000,
      MetwzaLYB2wyUzqu4C8laoHPkbqLgz6CsNJVLdTvgjY: 1000,
      "_y9Jpuhi4mvpwFAJCoS0qU-OrkV0xhNAy4rdWt9IJRI": 1000,
      "x68Nflop8l4e_tYcVd5vVJF7z6T2qPFzLx-dJwHr4QY": 1000,
      "UyHnlOMrFpECs_0rG9VN6WuUSePuG-ggaBgfSXoCpaI": 1000,
      "0mml_SjailMcWfPV1Sf4nIzw0b1DERXRUFB9P9NHxZo": 1000,
      b0i9kU615Sv7ppUzD0QjolxdVa_tLHwCRw9NDtPb1cs: 1000,
      vobG3TNXEU7lSMVGmOZfvYUFA0r31J7W7Y7foDp68FI: 1000,
      "UDEiq8JB6K4QvSLK-2tnLsDTrpX6m5VYShrUyLDimgA": 1000,
      xzkfyqbZXL8WFoghDi9RqKoOn5Dr3j3VXUJnXecSBkY: 1000,
      "3kY_Qd7RvnY8OhW6D_bQaNPDnDlMOfodg-BA1Z-ZNF4": 1000,
      "2CksGWr3c89MmmmEZobNcq9ZvduXLcGVHo-o2y7I7-Y": 1000,
      "QX4tO0VYa-19_bKqJ9UFSfMS0kFHZj2M4qhdu6W8mSs": 1000,
      V5RV_or721R1xC9gXDFvBMbNyvhGQ6e4cFlpc7Z_otM: 1000,
      "_S1hOabv42Fez7VOygJFLFbiEV1toitW-wOprgGOscQ": 1000,
      DcYVApzwNgEAXHGDH1QzBXrShg6ajI9jAvksJxs5rdI: 1000,
      "5f9nPqQWCtEuv9nbd5dAb2yePLEUF5jgSo5gCB2duy0": 1000,
      tNXDLrqmxRfw5hNF_NvRBJRnIQ9cJTLARrK7pQJ5Oc4: 1000,
      ZcyRQv5rhGsvkv8zNZP4FJYJNGRkyT4k5d7GihhJsMI: 1000,
      YJM8lBWQPXAqi5A26NpWUlLlCxfqeMvE1pTe3OHvmhE: 1000,
      "WlUXvTlMuLEsaCU8FcEnQh7sOCG29PwVC9DvUG-Bg0o": 1000,
      GEHG0KyzmwTMjKiev4A537hr0g3wAO4cn2gG3xUE5fg: 1000,
      Pv3JIaNENkOaGajJdCFuia0KPqAnsCy8LlP2vAipnDc: 1000,
      zSdJAlaVbd84CpOinA7tWsGKXqrLhtxpUPRqWyzZrZ0: 1000,
      VxJHCMarfcI1pe_NfkbVZIFH_wlnPWjzxiyZbG3cmLw: 1000,
      mj9ujTVdzatFdrdKPiKg1d2E1H9nA52kYeGhIm_C_q8: 1000,
      aKUjB4XlfWaD5Mj8iWOQ8tudWxfbfykbiAMP6pqx6uE: 1000,
      "oP61zxt0hmnU9c4mcccY0Q6KG6xxXMlHCuBB-LIW2ic": 1000,
      "urD-G_9qI8aP4QGaFl_y-IG4dSMJ2q8nBfSjQEEuu_U": 1000,
      "rmM3TKKAIaC4XTMCLD0lLKs-vwgDmhYhPHZFURFPKCE": 1000,
      "41PdNfOjCzf1JUJQRj19hKa0S6sGN-amcDkHmxr32D4": 1000,
      AxIMDrq6B3_8qHRqdnq26zpvGxxlqdMrCGlV7rmnbTk: 1000,
      "ITvmVHINNT0Rw-UPBxyRAYUVC0K-b_v1P2rFdSZLQzg": 1000,
      "bmB26DEPmNI84nPgd4icizuQQQc7jqFKeg7SnE-2-PU": 1000,
      q8BMNVH6WTLsCDCHCmkLwxL1fncRb6qkzmIuB70iZXU: 1000,
      "KXuDQZjMEGSIj_eTbHNZsoaenywWB3-oD-5XZxmYANw": 1000,
      W2yd55LO3NE3tFhnD9_SlkO0PiSqX10JLaLkeeRFIgg: 1000,
      "45mIR2k36h3RCeLW-ZF1RC_KU07HakYgUX0W_orTLsA": 1000,
      I1trB2wjtfggJsywry2GTesjG_83RWbUPZ3ytXyYprk: 1000,
      rBJ4z4Tu5c01SmlRY0hT_HbE_gOxHCQziuF55QP1O4w: 1000,
      KDJkSEviNRklSVyD16vQQYaHnplii9029fR1dbYPlm0: 1000,
      LEoY6xUsOCR0budGS8FXiEt4ill3W1QpeFvR8sDD6r4: 1000,
      "8r09g0NFsV-hUvZAPlg1MROQ4fJdBt2ImWjn2M0nT4s": 1000,
      "ljvCPN31XCLPkBo9FUeB7vAK0VC6-eY52-CS-6Iho8U": 1000,
      "hXBsPaQk88oHfHfgLbSqer9pSrh4qzHcreVe-TJdWj8": 1000,
      "GMTswDLONifSog8w-hx5OB6HuCVlozxqSGs30JSZlJo": 1000,
      Tz6et7CVxOu_lyWwyfi0x8J91aZkW6Gtys4Q8fQxinA: 1000,
      MN8E3kuFEdnCohTB7X3Vj_o1qn3tS9d7XSF8nse63as: 1000,
      "0DzzT7l13Y47yFI57sttFAJ5CSiLki5GPZr3kSX8Hks": 1000,
      "28ruIvybbH3o6exSDnQDvKii1ih4T6_nsB6hszcfgXI": 1000,
      "gfO2GDkDa2ANNePuuG7FPOcA-xGOsldWHSy7L5GXvcc": 1000,
      "HHEhKuNgUq4pzcf1hWLk3B6xw-fTx4R2Z1_cuOUPvpE": 1000,
      lgeLeZgFwqcfkUe4wPisb7kjJUbtk7GKpz4D2LoSIQw: 1000,
      FzHCs2OLzQbhZrFH7RDWWQmAAxg1aCJQ3iIS1_jtrGY: 1000,
      "KVZ-7SilfJFolkaGWaa2lNO3rddI7XgUYUYT5DJjhGg": 1000,
      W2i9pU_fwh6NsKn5cC9ALCSoCuzCp0JWOJzs0Q2I7Zc: 1000,
      zTjiZkNo6PlOTtldKf8spNERpVkObpBfHhww0ZNZgow: 1000,
      zHZBN9gQkfFkbPPGFpM0yV0xGVNJEIimJr3RnPRwGoU: 1000,
      OgxLICZ6OwrmY_t1O3LEdOQNx568HuH9FdLsEWrwyh8: 1000,
      "kTc5ycr1js2-Rvj5u-DWqBy5hg8GcHEKeozRGMOio2M": 1000,
      "rOkJGXLx7EHAjzhnNzc5F6m_v-yRDZRTffQkhTD-cb4": 1000,
      "dN6LPa5Rn1ycE48UpX-QC022Y-Y9tL7_EE_fIqQmM4A": 1000,
      "K3BlwjKRMe-U4NUQuDPtJ5yRVcEkasXoVEQzJag-jWA": 1000,
      "kIJvIzW9qxpd3rE0ODDw1qFdPth-iAL5smxSZKNHug4": 1000,
      pYV6waE2adtHs6naYV6novVicskhBeARzn9bUdf02R0: 1000,
      "5lKhekAhZ6z_i-oWdDekn5x2Zn3yt2WSILt7RAiHrTY": 1000,
      "M48Olo3zD3Ft_So5hm8-iepL6LspQB6CAhDk0ycCCQo": 1000,
      "ejOWZcyP9OG4c9Gry_EatABVq-Q8jUevt5bCRvXxkUU": 1000,
      xrGChjguEUqpUQhZ1X08cT3lneXh41v8bvQi40cUs5w: 1000,
      "kzR125T4r0h1EqGp9WTJHGSHQuz4G-KJ_i44Vp9E14c": 1000,
      "xsntg4-AocYS0vENMIejXi0Bn4Yu-LYRV297wHma49k": 1000,
      UvkdWo9QqJlwNn66QV0tP5mdkSJdnXMhINzGUDJfS0U: 1000,
      gB8QVDwLIYwlPys6yerzjiJZNHqlhIpttV76hWH7aKU: 1000,
      q3OBvb_qm3d8T5yhomKF8fA4WvOz8IT0xf26tRJIG_Y: 1000,
      "cJqCHt_XcWcZS-EbHbzykHivLm0ow8HVKC77TnXI19k": 1000,
      "Kfs9K4b1252BM_Wfi1-dycZiGwTZ66kjzFw12F-E4DI": 1000,
      LNsDo1ZJBqKqna4ve5V_GgKZmjMRpiqvT8XqnG8EOyM: 1000,
      zKxynG7OlL5vAmoOWSp1mAYiwPJYtCms49s_UPJODfU: 1000,
      bZVlgLyuBhrJgIRiSBsex8nxxSv6GAQkjonWpGv4KK0: 1000,
      "sitXUFOSzRslb6N2z0FWn7-Y0EW-6gUDYAvIzUNy7cI": 1000,
      "85JH3_CsS70Giq8JwWVtjj42xWe0oZeR7qZATUR_ftI": 1000,
      VXKKqVxmCoxuyVqDA0IMWHRvq8nZPjsTLmQiKduXj0o: 1000,
      "rK-7IhNEcXY_bRVkcpvoGNZiFmfbRMWPwEF5BS0koJU": 1000,
      X2y8grlhyLqAr7rAlXKwVKupL9YcWDQdN7GN4jS2FmQ: 1000,
      "26WkMNKmN3u99KnN5DuKJD0CGYoTdiW6jJ6EyC_ied4": 1000,
      "2iy9dvzSyae7dR2WY0KR2BYaMN-akvbDVxzwwjC6PZE": 1000,
      "qkWEMzD0OKn5gDc95YWMGLe9TsSd33n8thz-_5hK3LY": 1000,
      "7uZaYq70Cu4ekU77AUCuvOky5X_ODGG570aIoGNegiM": 1000,
      XELixb37Sx3TYfOi843YJrNcI6QcKzvJ408dVTFK5g0: 1000,
      "en-tqjQjuBlNURx7xAlF7j-PaLZWgCvy5COM0DJemmA": 1000,
      "RmvdJ43XDjubXzbx-D5Jr3v5hzphjWyfwsYkV3v33rY": 1000,
      "7xL724XhcnozNtfgzFhQafDmKctxV4wBeBhQ08uQwkI": 1000,
      "sUTQjM-8W-QS6qMgml6Q3Zewk1uw_bDrfKb18hxVfwM": 1000,
      uRglmpqtO6W_k6WbDNAn20dyfVUVCBvMPD83WJ0WpD4: 1000,
      k2YBhOvv7KiSOOnPA_Aftg5vEbt4p031aYGZDUPL9qg: 1000,
      SAUKIxmVikhj6EcnT_dm3mlTyfaItq4Oa3DPCrEJzAc: 1000,
      gx_vsQ4sO3pjIz6lmh26a6IQbWTBtmZ9c2dlPUSI9uo: 1000,
      "Ig6mBCL_Uzqa_GvuEUOVWOC-dsYu4zxMVpuPf7B6EuI": 1000,
      rjw8HyXKc_W9OIh8IhYhd8MzmlEXRTG219CstQ1JAcM: 1000,
      "6IfeljGVVymyYZ3vmaeuT-ivqA_yu08cjrt4TGiLbxI": 1000,
      "OVykQflMMLIRD-GvWUOX6rGUw_RNhDD0eXf9quwzJjk": 1000,
      "6bhDkf-D15hYClAUpyW51cYpTkZWIcONHxDARdZT6vg": 1000,
      AHd3DmjWKUw4TjwCrk2_2rfyEf6jgEdWTpmRJAPdZi4: 1000,
      "Kwtu8st1N-GdxPim5jmgFAWq-BwH2O5Ak8ADuf7QEB0": 1000,
      "DoD2Ys-J8sbE3R7bzG7oL-5OiPGKpl7MKeZ2EkJseNs": 1000,
      hAe3YVxv1DXFVdjquyl9bvb_0_LQCpK6bjWhKFAc8c4: 1000,
      MUUQ4JCFrwTGLFkp6h6g_6uWSvc5OdaFF1p6AwwwPXQ: 1000,
      oP8eDBQUQYbI1e2C6qxd3ouQWQ3WU9m9kBXnPWM4eO8: 1000,
      "Ksr8PLkYxz_N-YhgLAXxfIbaYBGMTkU82H6sgWmQVHY": 1000,
      "08LMz8ZnS9FIhgoIt9o7gLmdsI_HdeFdJR-F0j_Q6HI": 1000,
      "iCQK86xvLOSA0n-jiH8IpBdU-GR2O8SwyGx4RLg7TAQ": 1000,
      eYtrAFfSb8UDr4SUqLxKEv9h3PPNffIUoqeIcwDJ0CA: 1000,
      euSLZKxZWzGP8jy9JlTvCxsL3AU4YttYrHYoKbdxIa0: 1000,
      "5-2s416fN-1QH14ys9gzC0xqDw7kA40qfeBmEQGz4Ys": 1000,
      "PNnCbWW-Hh6xy4qHHw02xDFuRJwVqJd8ahhIGMLm-go": 1000,
      "biy4pep9KWd2stl5K8iZWObPaaFVhtaa6BO0s2RAL-g": 1000,
      "uOyOt8mnX66EApPS9oNyiCJxwe1oIcpHG6M-KpUyRvc": 1000,
      "wHYbYbkIsQjfrTR-yUCnNUtksA779g9d46EROP0ZgRQ": 1000,
      WiGInd_0_wQJARxI9cMHq3cdfE3nJ9yu9lPKwG2Ecg8: 1000,
      "8rkk8651EC5D-2mFHN2Ggd43844p9L2Iok8AypoLPaY": 1000,
      "_V7HmxSiURy-_hy6oqJxZeBn9Z1uRYERvoDE6XbnFVg": 1000,
      "5Ggzb4BBxKsXZUcu63Hy3RzdS7jz590OCECz281uYXs": 1000,
      "ikntTT5xoAV_L-qN5csIOmb09m4PfZuO05ENazk8ni0": 1000,
      x9eaZWE75fM7Ga2udOoCkgFTC_V4uVQ5BvSVdj8xI6g: 1000,
      "WL37NMvvna_zhKzp-BqxLzyPLSZuVOVTdNk5qHULvGo": 1000,
      swkOIzAEwiNaAIOE7QPU8BTDcalw7Ja_egqGxWxMiEs: 1000,
      bmiq2EWxm8s37GrrNjCjuQI5xlLA9u39b8Tsr4O7X7M: 1000,
      "iSTI9jcsgf0BsGpfRhxM6I_UDAicBLLK2fyfC-WROeo": 1000,
      Ek5MQTKusredGiHtwJPglt86tcpXh4ngsTBLduW_HBw: 1000,
      "u2s-GKZqJjixjQ1eeiX5Je-R6ofJfVKRHO-WIdXSmiI": 1000,
      RnjBoHk8dxy7Aw6sqRdSmc3xjAhD8jlT0wcZaEWYa_M: 1000,
      rWmJWvXwzjemo9KLEjnw7ydFPNDeuBupgY57_NsZPtk: 1000,
      Il9yWON5SR0a00aE_6iowKVs7GYR3ZWGricYT2ugH0o: 1000,
      "AT-zgYtLgRrQ3ohRZ6LQ4AvOKraKbLvsQS92C-bzg2o": 1000,
      "uY9i1Uo-VtYsHu4d3EMNPpqLQBdwnlA_tPUUugBFa48": 1000,
      "JSRefLYn-VDWvw300B72OtaGVVrrQbz0ptJbt9si1A0": 1000,
      MA0G3uK9962aVMSiDLqQxv9ibDTRocXJ2iMbO_LrXTY: 1000,
      "b-OcmcO0QhQUSrn5MMfJNU1AxU6Z3C8qMHFI5GqOaYo": 1000,
      "Z-4qFwf8NvitFGjbY-sFTvQFhDXasVpX1DoJZQ7tOn0": 1000,
      ZawHsP6gaxIXiHyLGK_Oo0oPOMwkVR7AeK9z5bjx6bE: 1000,
      "N8Rw9kJnlFSrjUQCTfuhHyIu2tv370XR-dWbZDVb87A": 1000,
      xdBjV3Cpl21ORZ0XeBKdVxApI6esQhHxjk4cPRxomyA: 1000,
      m9okDtbv5fOuqQAh2terRxXo1ULCy4GDZkzj5RGv_Bc: 1000,
      PNEqejASU1paqTdaG4DfqC55h5W25LPrcjAGxudDvw4: 1000,
      Sjnq7CWRxw1NKW8O1FGjf6vbnhIhrOnGpeZtXv6XykQ: 1000,
      "18WpXVWELzQteDAfX1mBSwha30HdoNugQC2alaN81TM": 1000,
      "kXMz9-TLehTnAo4vbsIgequuQjbvQ67re9lkoh80Cog": 1000,
      "W9bHWH2gNVo-H5Y_N0vllfvegItjK_VQvkd5tcp4CUA": 1000,
      "g-fQOHWWXIRBBidHMYwowD_a4IR_ZQUBIloZULRpYuU": 1000,
      "E1TKpreFrd4aCvieltcHZsovqM9WvO-4jQ1R37-3kRA": 1000,
      "fhjABD00TaxeLlqfq6T7X2B7uTU6qWy2bJVHpNd-lhI": 1000,
      moUccfWqXXAp1WiBY38kEzgwkeRJdbZM3zAryS_rXcc: 1000,
      "bvwqItQsNEG5Tpl_jZ4LWs11PQ-Kj6nFfKcZmNJTz6I": 1000,
      "K5D9ybDiKgsmej5jISybKIkQGuH9dngsr-Q9idnfXpA": 1000,
      "EWhs597J8TYuf0J76XXgtrKF7oi-_TSgKoUZGv_r3sQ": 1000,
      YImlOumuV5rmyop8bVJsr3mAjry0BDtQQISjUlqyCuU: 1000,
      XnvXLMnJGE0RHQNJrcwqZP8BgbkGsvETRCuzfzUzR3o: 1000,
      lDdcZx0zrYgE8bYjD8JtDZ6G9NdrrQJYj7jS1Shtt7s: 1000,
      U4wzu5D0XFA1acpSOXidvcfRcsKXmz1kl47zBzgHTv8: 1000,
      "4C4nTvKJwmSiXDDPX3NnEg3mmntEUPeMSLNaB3xd11g": 1000,
      iatW2iBGe9pCpB0Z_wTRnPlBICOGq6nlxOcihZboFlk: 1000,
      "GJu32_FZNQKIWffmrWCvBaT7XK9EWOS0N5GeNa8ps-4": 1000,
      QDP9ryjOnghRgWKMuMl7BLeb98fI0VlgCft5UgQ9QYw: 1000,
      "9FbMobcHPZOg7UC3bEwxiztHOD26dRFrLoqA0nMr2pI": 1000,
      "tpGyuBoD-ygKaJr8bJ4krhAMRnvZmmIM1-KFiQtfmOA": 1000,
      "iAcdDCjIxaZkdIsRU-nTleSYue_VMw9OmK9cpX82A1A": 1000,
      OJtIdX1J7KYGz4SHJmGNL7XRc_oJVDgvelTGD1R3mNY: 1000,
      eZx9pnFVS67tPigfgCm6_tD1uNPiDKkKzLx110g8G9g: 1000,
      "9Qnc3AibFoqiuibsztJ0XUWJ0c2w6ihgfwMFAVfHxtI": 1000,
      "5p0Y3DbfYadQ2hbmZkUfvVKfvPjvgZo80CwLZpGmEOU": 1000,
      "YmbG4v12UkeLCw6LSGbwcjJgn576JU0-3hjwwyWi-iM": 1000,
      uq30NLzg_Ohh88ANrX_de_njVQcEmmzxm396tA4ZVcE: 1000,
      "MAwq2Ef0qD6SQhs9ycDYaDlODNT3-TG_1NVLirvPfdc": 1000,
      r0GclaMhEEyEnFg7mYkKthDEaAAD6x0DYPEhPz8ByOM: 1000,
      "k08Vukwo8ulIWRRoZgFdAXvy4kcE35Wua0Pdu7-oSnQ": 1000,
      "WKKsC4OjoEzs3-H0I2z_6wfX0iFyHW-0YwBGV1jgjaw": 1000,
      "FezDbG-Tdx7TB8Tu4BdknXp9jAGN6vNxSeYTJaci_uM": 1000,
      "6sgwl3ChsWtcXwTNTMpBKlz1ykESi4Ohe42_M6-ttyI": 1000,
      "XmyJVx5S_sYkyY8JnQCRrTBo4w6mImzn1KTh-2qwwuA": 1000,
      RSfmOAgPOusRXeaMK7hwL4nFhj61RQ5e1B_Zn8BDqQY: 1000,
      "5_oQpPstfbBjcfXFvGiIZDei3sHd2Ueg69KrxK_gZ4Q": 1000,
      "tc9zLG9HrXl9JdYUv5CYPGUM-ViXvUF7iKyf0s4UAyc": 1000,
      "j_fNUZGSmEc-WvUnJQ9eFdirkb1cz3lfpc2bwQH2trI": 1000,
      "X-2QjeFs91dHfUA0E93Zc2dDIvjlJTSYUoxEoQr7K9M": 1000,
      "Ji-QM8XvGGYUrD_Wnv8wT2pU6tzBCn8gn5Iq4xa4Bz0": 1000,
      "IkLv_CMUV7W5kqwfiCfL6XEU4Q5xETHrkeADPLyX-Os": 1000,
      hx7enkfFzTb9TIsu0sSF5z0yUWbWw9U61xyrhxBVAGk: 1000,
      M00riAZlmN0SiqOx3kDUaWryWQfTwI7D4cgfSuOXwrY: 1000,
      "M4RoyxLGfeMNwiRe_tIVBPmfZBg-lqgMjvmNpPfga1c": 1000,
      "926eje6FzkfZvNHf5_PjbCtpxkzT_IsmCIV24XqdzMI": 1000,
      "joWHqn1ltpbUxK-f5ajdfeNGAwR_T_RHxZ52nHCLLOI": 1000,
      RGABsdLEoZapC3obDOaR7eGMsBf6hMhwSxH9EHixcVk: 1000,
      "LLL-S9WavNv-Yq2lNuBDzA_sjEecPr88VB-PDJh4DqE": 1000,
      "bEmxFPlsoXROb-sLn7P1zhzwmkJRzJYz5plWGuZsMjg": 1000,
      S5rYd6Ha17WeAqPCJIHhxnjxQosEFSB7sRdNaB5ur_s: 1000,
      uK4RfU3hLZzye1Vi84x_zwt6n_ao_e2jSQSiVcourB8: 1000,
      CY56a10X1u9SW9muJ9tN8IxQ0lXJU4jm_5rwvdVBnwA: 1000,
      OPhX3fkWbJ4hQI5V_aeXMliMXwuIQf_z1v2CawH2bMk: 1000,
      "E-M29PMMYi28hpCL8da9rP9lYYcDH1sJJj5ejVC_vzw": 1000,
      v4FgUGJjRDo9QHHR7hoabbarFUHX2Sk0aFaq1KWXoLw: 1000,
      "5tXfeDGt3PVKUsdut0B8oZwk379Jd4yQDUZt7pJ-buI": 1000,
      "yACHoJNpGzEq-ykdw8hdPJHOxKgpuZciEZ4iX7oajYI": 1000,
      "OjL564pN9TxvhoWmIf5r6glixMzQlfuVSo-qw7MwD9Q": 1000,
      "Hg0L5LfiKqzunspG6Iefl3yoUErX-OpnNQSP8QpRElU": 1000,
      _OCM8Yk9azW2CBUI43xnzLwIPafbRnBrVgSh7gNuD6M: 1000,
      "hnQanJEymuTh_fN-KUs83Ep7KUUptCzg4y_jsVfsrqA": 1000,
      WPtzyZxAj4PqebjyZ5L1TP0cs3Xmee5XrjKXd2xtpjw: 1000,
      lUxX0yvia1n5fYe44_P0b9jDJYOdWaDHpxm76bXSYiM: 1000,
      "9A7vCsUt1Oc1nEurd4lKJPRJCcVfFyho1QKdwnCdsXs": 1000,
      GTZPwg9CVv2fPwNgxFDilwshI_In4IqwqL8Y23su2JQ: 1000,
      "0JKQCsyPkn-MOrVTur8MT4cacCMa5LHHiiahfoeN0RU": 1000,
      "s8uO_FZzqDcSFcAb5sUzs-hH9IPtKnx-qpTqnhhkK6s": 1000,
      "k2sXYM-IvH1Q6plkSz2lgR8lll7DhIVOnuz0I_mqLts": 1000,
      "lSxP6nuLSvR9b6-uS5GDaMzUHvnySIPLtRpOGtEn-G4": 1000,
      Qfod6da7zH3LLUrys6jmjsUJJtbcikDVK7m3dVEoxG0: 1000,
      bEwTZqYZWPVWubOQAetJZTn0RUAuUqnmxqfHIJWAy_s: 1000,
      wGQWTOJ3axkebA5ZuidlepTlk9WGn1fEJDaje10IpoU: 1000,
      "0RWuHL1469WYh146-x-5IKtes0WQweqv8d9OehyxFKw": 1000,
      kmtKTyd_S_eZO3gag2qAspIMtAopJ_wN6qQ5Np0HQVo: 1000,
      "waGdO_7V0hUsm5v7lUFC-bT0tSXQG7g_K1s2bheistk": 1000,
      "fpr2iOeyXcYJIx9eUr4IdPY9MEbu9fNrktWhsw-8EJs": 1000,
    },
    vault: {
      vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU: [
        {
          balance: 1000,
          end: height + 5000,
          start: height,
        },
      ],
      "s-hGrOFm1YysWGC3wXkNaFVpyrjdinVpRKiVnhbo2so": [
        {
          balance: 1000,
          end: height + 5000,
          start: height,
        },
      ],
    },
    votes: [],
    roles: {},
    settings: [
      ["quorum", 0.5],
      ["support", 0.5],
      ["voteLength", 50],
      ["lockMinLength", 5],
      ["lockMaxLength", 5000],
    ],
    trusted: {
      contracts: [],
      sources: [pool.id],
    },
    invocations: {},
    foreignCalls: [],
  };

  const governance = await createContract(
    client,
    wallet,
    governanceSrc,
    JSON.stringify(governanceState)
  );
  console.log(`Governance:\n  ${governance}`);

  // Deploy treasury contract.
  const treasurySrc = fs.readFileSync(
    "./contract/treasury/dist/index.js",
    "utf-8"
  );
  const treasuryState = {
    governanceContract: governance,
    invocations: [],
    foreignCalls: [],
  };

  const treasury = await createContract(
    client,
    wallet,
    treasurySrc,
    JSON.stringify(treasuryState)
  );
  console.log(`Treasury:\n  ${treasury}`);
})();
