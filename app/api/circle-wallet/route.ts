// api/circle-wallet/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import forge from "node-forge";

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const entitySecret = forge.util.hexToBytes(
      "6455f3156459609339d3c99065e08990e2cfff75236029fbc25b4c789147051e"
    );
    const publicKey = forge.pki.publicKeyFromPem(
      "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwX7lnAzpvStTbLl8U5QN\nzQdVS8epbLrHvcRUp9Z2o9IifNQ9VLh59+w919xKud7fPwzbsqSH1J3UL2prRILi\n+vUkwcD8GG0LSAUzTzk5yL7rpVKVhGsgol4XNb91jzoW/HeNFhQ8q90BQZrdCOqO\nNtBBGh0fbO611C0G+ky6UlsSchkslGYVbEhLjRBhxv9szf+L4+BHlDtVwcXQETfm\nH82DjVtxfP/hNdKX97iKyRWHsS1I41aYHEpgM/E8xPjkaZqb8zrhxpjjwY5NuxZ1\nm4MQ9sJuJXRE+AqPQsvKHeN66mtzva9rZUNq0vCyqbO5AiTqj11Tv6SoXyJOLC/a\nr0wydjQlASZppNHFEfxqcG6Ay0BZlT/4c+nc3QcqtdBEPj3MSzqHstqBWTtzrokJ\n5GCo/5OfGjYhW/BqveWUolb0L0BvH5BEiJAz55hNwmCE4PM23genskyEx3tIDTRU\n/8YKsor4srP4w9iRZm0edruRrQ0htbvK/1HwN9TQwfqfwanWIfBkNXP5zBxT8Ut9\nCvACLAUxxsc7e90ZnYYC5dRyd8XYsxKozVph3e74yfbzF3hxppP75w09r5u5uduQ\nu7/ZiUv4tcIvGN4WpJPE+07rjoaGto5NkXF6ID8k+AoESGvLyFKW+iadyTu23pCg\nIjnIFafxjB1yG1AJ+5Q6JtsCAwEAAQ==\n-----END PUBLIC KEY-----\n"
      );
    const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create(),
      },
    });

    console.log(encryptedData)
    console.log(forge.util.encode64(encryptedData))
    const encryptedData64 = forge.util.encode64(encryptedData);
    // return encripted data
    return NextResponse.json({ encryptedData: encryptedData64});
    //res.status(200).json({ ciphertext: encryptedData });
  } catch (error) {
    console.error("Error generating entity secret ciphertext:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
