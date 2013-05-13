<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:key name="mykeyteams" match="//match/@team_A_name" use="." />
  <xsl:key name="mykeydates" match="//match/@date_utc" use="."/>


  <xsl:template match="/">
    <!-- SELECT TEAMS (DISTINCT) -->
    <xsl:for-each select="//match/@team_A_name[generate-id() = generate-id(key('mykeyteams',.)[1])]">
      <xsl:sort/>
      <option class="team">
        <xsl:attribute name="value">
           <xsl:value-of select="."/>
        </xsl:attribute> 
        <xsl:value-of select="."/>
      </option>

    </xsl:for-each>
    
    <!-- SELECT DATES (DISTINCT) -->
    <xsl:for-each select="//match[@status='Played']/@date_utc[generate-id() = generate-id(key('mykeydates',.)[1])]">
      <xsl:sort select="." order="descending"/>
      <option class="matchdates">
        <xsl:attribute name="value">
           <xsl:value-of select="."/>
        </xsl:attribute> 
        <xsl:value-of select="."/>
      </option>
     
      <xsl:variable name="myvar"><xsl:value-of select="."/></xsl:variable>
      
      <table class="resultTable">
        <thead>
          <tr><th colspan="7"><xsl:value-of select="."/></th></tr>
        </thead>
        <tbody>
          <xsl:apply-templates select="//match[@date_utc = $myvar]"/>
        </tbody>
      </table>
    </xsl:for-each>

  </xsl:template>
  
  <!-- TEMPLATE FOR LISTING MATCHES WITH STATUS = "Played" -->
  <xsl:template match="match">
    <tr>
      <td class="time" style="width:70px;"><xsl:value-of select="@time_utc"/></td>
      <td style="text-align:right; width:150px"><xsl:value-of select="@team_A_name"/></td>
      <td style="font-weight:bold"><xsl:value-of select="@fs_A"/></td>
      <td><xsl:text> - </xsl:text></td>
      <td style="font-weight:bold"><xsl:value-of select="@fs_B"/></td>
      <td style="width:150px;"><xsl:value-of select="@team_B_name"/></td>
      <td><button type="button">
        <xsl:attribute name="value">
          <xsl:value-of select="@match_id"/>
        </xsl:attribute>
        <xsl:text>i</xsl:text>
      </button>
      <span class="indent">
        <xsl:value-of select="@date_utc"/>
      </span>
      </td>
    </tr>
  </xsl:template>
</xsl:stylesheet>