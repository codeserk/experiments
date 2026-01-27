/**
 * Calculates a signature for a given content
 * @param content
 * @param secret
 * @returns signature
 */
export async function calculateSignature(content: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ])
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(content))

  return btoa(String.fromCharCode(...new Uint8Array(signature)))
}

/**
 * Class used to generate signature digests adding different parts
 */
export class SignatureBuilder {
  private parts: string[] = []

  /**
   * Constructor
   * @param secret
   */
  constructor(private readonly secret: string) {}

  /**
   * Adds string to the parts
   * @param string
   * @returns builder
   */
  add(part: string | object): SignatureBuilder {
    const partString = typeof part === 'string' ? (part ?? '') : JSON.stringify(part ?? {})
    this.parts.push(partString)

    return this
  }

  /**
   * Adds request.
   * @param request
   * @returns builder
   */
  withRequest(url: string, data: string | object): SignatureBuilder {
    const urlPart = url
    if (urlPart) {
      this.add(urlPart)
    }

    const bodyString = typeof data === 'string' ? (data ?? '') : JSON.stringify(data ?? {})
    const bodyPart = btoa(bodyString)
    this.add(bodyPart)

    return this
  }

  /**
   * Adds url.
   * @param url
   * @returns builder
   */
  withUrl(url: string): SignatureBuilder {
    return this.add(url)
  }

  /**
   * Adds body.
   * @param body
   * @returns builder
   */
  withBody(body: string | object): SignatureBuilder {
    const bodyString = typeof body === 'string' ? (body ?? '') : JSON.stringify(body ?? {})
    const bodyPart = btoa(bodyString)
    this.add(bodyPart)

    return this
  }

  /**
   * Builds the signature
   * @param timeString
   * @returns signature digest
   */
  async build(timeString?: string): Promise<string> {
    const content = this.generateContent(timeString)

    return calculateSignature(content, this.secret)
  }

  /**
   * Generates content for a given time (or now)
   * @param timeString
   * @returns content
   */
  private generateContent(timeString?: string): string {
    let timePart = timeString
    if (!timePart) {
      const now = new Date()
      now.setSeconds(0)
      now.setMilliseconds(0)
      timePart = now.toISOString()
    }
    const content = [...this.parts, timePart].join('_').trim()

    return btoa(content)
  }
}
